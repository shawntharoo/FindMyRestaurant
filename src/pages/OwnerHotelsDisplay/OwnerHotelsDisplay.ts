import { Component } from '@angular/core';
import { OwnerHotelCreateModalPage } from '../OwnerHotelCreate/OwnerHotelCreate-modal';
import { ModalController } from 'ionic-angular';
import { handleDataService } from '../providers/handleData.service';
import { Observable } from 'rxjs/Observable';

@Component(
    {
        selector: 'ownerHotelsDisplay',
        templateUrl: 'ownerHotelsDisplay.html'
    }
)
export class OwnerHotelsDisplayPage {
    restaurants: Observable<any[]>
    constructor(public modal: ModalController, public handleService: handleDataService) {
        this.handleService.getUserEmail().subscribe(res => {
            this.restaurants = this.handleService.ownerHotels(res.email).valueChanges();
        })
    }

    openModal() {
        let myModal = this.modal.create(OwnerHotelCreateModalPage);
        myModal.present();
    }
}