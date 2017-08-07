import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'Page-SeekerProfile',
  templateUrl: 'SeekerProfile.html'
})

export class SeekerProfilePage {
  profile: FirebaseObjectObservable<any[]>;
  image: string;
  constructor(public navCtrl: NavController,public af: AngularFireDatabase) {
    this.profile = af.object('/UserProfile/tharoo@gmail');
     this.profile.subscribe(snapshot => {
        console.log(snapshot);
    });
  }

}
