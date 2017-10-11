import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
declare var google;
@Component({
    selector: 'JavascriptMap',
    templateUrl: 'MapJavascript.html'
})

export class JavascriptMap {
    @ViewChild('map') mapElement: ElementRef;
    map: any; 

    constructor(public navCtrl: NavController, public geolocation: Geolocation) {

    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        this.geolocation.getCurrentPosition().then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        }, (err) => {
            console.log(err);
        });
    }

    addMarker() {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        let content = "<h3>My New Location!</h3>";
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
}