import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { OLoginPage } from '../OLogin/OLogin';
import { OwnerTabsPage } from '../OwnerTabs/OwnerTabs';

@Component({
  selector: 'Page-ORegister',
  templateUrl: 'ORegister.html'
})

export class ORegisterPage {
  Remail: string;
  Rpassword: string;
  constructor(public navCtrl: NavController, public authService: AuthService) {
  }

  signup() {
    this.authService.signup(this.Remail, this.Rpassword);
    //this.navCtrl.push(OwnerTabsPage); 
    this.Remail = this.Rpassword = '';
  }

  NavigateToLink(){
    this.navCtrl.push(OLoginPage); 
  }

}
