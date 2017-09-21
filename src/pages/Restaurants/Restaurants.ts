import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'Page-Restaurants',
  templateUrl: 'Restaurants.html'
})

export class RestaurantsPage {
  items: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase) {
    this.items = af.list('/Restaurants/');
    // this.items.subscribe(res => console.log(res[0].$key));
  }
}
