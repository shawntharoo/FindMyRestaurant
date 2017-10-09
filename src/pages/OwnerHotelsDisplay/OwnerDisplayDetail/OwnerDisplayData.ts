import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'Page-OwnerDisplayData',
  templateUrl : 'OwnerDisplayData.html'
})

export class OwnerDisplaData {
    item : any;
    constructor(public navParams: NavParams){
        this.item = this.navParams.get('item');
    }
}