import { Component } from '@angular/core';
import { OwnerHotelCreateModalPage } from '../OwnerHotelCreate/OwnerHotelCreate-modal';
import { ModalController } from 'ionic-angular';
import { handleDataService } from '../providers/handleData.service';

@Component(
    {
        selector: 'ownerHotelsDisplay',
        templateUrl: 'ownerHotelsDisplay.html'
    }
)
export class OwnerHotelsDisplayPage {
    constructor(public modal: ModalController, public handleService: handleDataService) {
        this.handleService.ownerHotels();
    }

    openModal() {
        let myModal = this.modal.create(OwnerHotelCreateModalPage);
        myModal.present();
    }
}