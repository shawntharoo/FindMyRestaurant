import { Component } from '@angular/core';
import { OwnerHotelCreateModalPage } from '../OwnerHotelCreate/OwnerHotelCreate-modal';
import { ModalController } from 'ionic-angular';
import { handleDataService } from '../providers/handleData.service';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { OwnerDisplaData } from './OwnerDisplayDetail/OwnerDisplayData';

@Component(
    {
        selector: 'ownerHotelsDisplay',
        templateUrl: 'ownerHotelsDisplay.html'
    }
)
export class OwnerHotelsDisplayPage {
    restaurants: Observable<any[]>
    constructor(public navCtrl: NavController, public modal: ModalController, public handleService: handleDataService) {
        this.handleService.getUserEmail().subscribe(res => {
            this.restaurants = this.handleService.ownerHotels(res.email).valueChanges();
            // this.handleService.getRetuarantImageformStorage(res.email);
        })
    }

    openModal() {
        let myModal = this.modal.create(OwnerHotelCreateModalPage);
        myModal.present();
    }

    gotoPage(restaurant) {
        this.navCtrl.push(OwnerDisplaData, {
            item: restaurant
        });
    }
}