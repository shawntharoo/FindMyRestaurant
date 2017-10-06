import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { handleDataService } from '../providers/handleData.service';

@Component({
  selector: 'Page-Restaurants',
  templateUrl: 'Restaurants.html'
})

export class RestaurantsPage {
  
  restaurants: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public dataservice: handleDataService) {
    this.dataservice.getUserEmail().subscribe(res => {
      this.restaurants = this.dataservice.getRestaurants(res.email);
    })
    // this.items.subscribe(res => console.log(res[0].$key));
  }

}
