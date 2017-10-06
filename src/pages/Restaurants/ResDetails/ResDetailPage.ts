import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'Page-ResDetail',
  templateUrl: 'ResDetailPage.html'
})

export class ResDetailPage {
    item : any;
    constructor(public navParams: NavParams){
        this.item = this.navParams.get('item');
    }
}