import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../Login/Login';
@Component({
  templateUrl: 'Selection.html'
})
export class SelectionPage {

  constructor(public navCtrl: NavController) {

  }
  NavigateToSeeker(){
    this.navCtrl.push(LoginPage); 
  }
}
