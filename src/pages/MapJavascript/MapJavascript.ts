import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { handleDataService } from '../providers/handleData.service';
declare var google;
@Component({
    selector: 'JavascriptMap',
    templateUrl: 'MapJavascript.html'
})

export class JavascriptMap {
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('search') SearchBox: ElementRef;
    map: any;
    searchBox: any;
    input: any;
    placeDescription: any;

    constructor(public navCtrl: NavController, public geolocation: Geolocation, public handleData: handleDataService) {

    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        this.handleData.getUserEmail().subscribe(res => {
            this.handleData.getMapPositions(res).valueChanges().subscribe(response => {
                this.geolocation.getCurrentPosition().then((position) => {
                    var latLng;
                    if (response['latitude'] && response['longitude']) {
                        latLng = new google.maps.LatLng(response['latitude'], response['longitude']);
                    } else {
                        latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    }
                    let mapOptions = {
                        center: latLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                    if (response['Place']) {
                        this.addMarker(this.map, response['Place']);
                    } else {
                        this.addMarker(this.map, "New Location");
                    }
                    this.input = this.SearchBox.nativeElement;
                    this.searchBox = new google.maps.places.SearchBox(this.input);
                    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.input);
                    this.map.addListener('bounds_changed', () => {
                        this.searchBox.setBounds(this.map.getBounds());
                    });
                    var markers = [];
                    this.searchBox.addListener('places_changed', () => {
                        var places = this.searchBox.getPlaces();

                        if (places.length == 0) {
                            return;
                        }

                        // Clear out the old markers.
                        markers.forEach(function (marker) {
                            marker.setMap(null);
                        });
                        markers = [];

                        // For each place, get the icon, name and location.
                        var bounds = new google.maps.LatLngBounds();
                        places.forEach(place => {
                            if (!place.geometry) {
                                console.log("Returned place contains no geometry");
                                return;
                            }
                            var icon = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25)
                            };
                            // Create a marker for each place.
                            markers.push(
                                new google.maps.Marker({
                                    map: this.map,
                                    icon: icon,
                                    title: place.name,
                                    position: place.geometry.location
                                }));

                            if (place.geometry.viewport) {
                                // Only geocodes have viewport.
                                bounds.union(place.geometry.viewport);
                            } else {
                                bounds.extend(place.geometry.location);
                            }
                            this.handleData.updateMapPlace(place.geometry.location.lat(), place.geometry.location.lng());
                        });
                        this.map.fitBounds(bounds);
                    });
                }, (err) => {
                    console.log(err);
                });
            })
        })
    }

    addMarker(map, place) {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        let content = place;
        this.addInfoWindow(marker, content);
    }

    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

    save() {
        if (this.placeDescription) {
            this.handleData.updateMap(this.placeDescription);
        }
    }
}