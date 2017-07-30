import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { LoginPage } from '../Login/Login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'Page-Register',
  templateUrl: 'Register.html'
})

export class RegisterPage {
  Remail: string;
  Rpassword: string;
  constructor(public navCtrl: NavController, public authService: AuthService) {
  }

  signup() {
    this.authService.signup(this.Remail, this.Rpassword);
    //this.navCtrl.push(TabsPage); 
    this.Remail = this.Rpassword = '';
  }

  NavigateToLink(){
    this.navCtrl.push(LoginPage); 
  }

}
