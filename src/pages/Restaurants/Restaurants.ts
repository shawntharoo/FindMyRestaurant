import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { handleDataService } from '../providers/handleData.service';
import { Observable } from 'rxjs/Observable';
import { ResDetailPage } from './ResDetails/ResDetailPage';

@Component({
  selector: 'Page-Restaurants',
  templateUrl: 'Restaurants.html'
})

export class RestaurantsPage {
  restaurants: any[] = [];
  allRestaurants: Observable<any[]>
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public dataservice: handleDataService) {
    this.dataservice.getUserEmail().subscribe(res => {
      this.dataservice.getRestaurants().snapshotChanges().subscribe(actions => {
        actions.forEach(action => {
          // console.log(action.payload.val());
          this.allRestaurants = this.dataservice.getResturantsFromKeys(action.key).valueChanges();
          this.allRestaurants.subscribe(res => {
            res.forEach(element => {
              //this.dataservice.getRetuarantImageformStorage(res, element.Name);
              this.restaurants.push(element);
            });
          });
        });
      });
    });
  }

  gotoPage(restaurant) {
    this.navCtrl.push(ResDetailPage, {
      item: restaurant
    });
  }

}
