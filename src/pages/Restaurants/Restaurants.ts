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

    //Add data to the firebase
    //this.af.list('/UserProfile/').push({Username :"Shawn", UserEmail : "tharooshawn@gmail.com", LivingPlace :"Makola", FoodCategory: "Bun"}); 
  }
}
