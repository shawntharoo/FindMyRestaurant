import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { ORegisterPage } from '../ORegister/ORegister';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'Page-OLogin',
  templateUrl: 'OLogin.html',
 /* styles: [`
  .RegisterBut {
        font-size: 17px;
    }
  `]*/
})
export class OLoginPage {
  email: string;
  password: string;
  public value;
  constructor(public authService: AuthService, public navCtrl : NavController) {}

  login() {
    this.authService.login(this.email, this.password).then(function(firebaseUser) {
   })
  .catch(function(error) {
  });
    this.email = this.password = '';

   // this.navCtrl.push(TabsPage); 
  }

  logout() {
    this.authService.logout();
  }

  NavigateToLink(){
    this.navCtrl.push(ORegisterPage); 
  }
}
