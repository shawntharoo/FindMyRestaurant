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
  private base64textString:String="";
  restaurants: Observable<any[]>;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public dataservice: handleDataService) {
    this.dataservice.getUserEmail().subscribe(res => {
      this.restaurants = this.dataservice.getRestaurants().valueChanges();
    })
    // this.items.subscribe(res => console.log(res[0].$key));
  }

  gotoPage(restaurant){
    this.navCtrl.push(ResDetailPage,{
      item : restaurant
    });
  }

    handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }

}
