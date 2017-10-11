import { Component } from '@angular/core';
import {
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
    selector: 'map',
    templateUrl: 'map.html'
})

export class MapPage {
    map: GoogleMap;
    mapElement: HTMLElement;
    constructor() { }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        this.mapElement = document.getElementById('map');

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = new GoogleMap(this.mapElement, mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');

                // Now you can use all methods safely.
                this.map.addMarker({
                    title: 'Ionic',
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                        lat: 43.0741904,
                        lng: -89.3809802
                    }
                })
                    .then(marker => {
                        marker.on(GoogleMapsEvent.MARKER_CLICK)
                            .subscribe(() => {
                                alert('clicked');
                            });
                    });

            });
    }

}