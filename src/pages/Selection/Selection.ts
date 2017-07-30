import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../Login/Login';
import { OLoginPage } from '../OLogin/OLogin';

@Component({
  templateUrl: 'Selection.html'
})
export class SelectionPage {

  constructor(public navCtrl: NavController) {

  }
  NavigateToSeeker(){
    this.navCtrl.push(LoginPage); 
  }

  NavigateToOwner(){
    this.navCtrl.push(OLoginPage); 
  }
}
