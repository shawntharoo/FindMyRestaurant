import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { RegisterPage } from '../Register/Register';
import { OwnerTabsPage } from '../OwnerTabs/OwnerTabs';
@Component({
  selector: 'Page-Login',
  templateUrl: 'Login.html',
 /* styles: [`
  .RegisterBut {
        font-size: 17px;
    }
  `]*/
})
export class LoginPage {
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

   // this.navCtrl.push(OwnerTabsPage); 
  }

  logout() {
    this.authService.logout();
  }

  NavigateToLink(){
    this.navCtrl.push(RegisterPage); 
  }
}
