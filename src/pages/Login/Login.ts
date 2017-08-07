import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { RegisterPage } from '../Register/Register';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AlertsService } from '../providers/alerts.service';

@Component({
  selector: 'Page-Login',
  templateUrl: 'Login.html'
})

export class LoginPage {
  email: string;
  password: string;
  public resp;

  constructor(public authService: AuthService, public navCtrl: NavController, public alerts: AlertsService) {
  }

  login() {
    this.alerts.showLoading();
    this.authService.login(this.email, this.password).then((response) => {
      this.authService.user.subscribe(res => {
        this.resp = res;
        if (this.resp != null) {
          this.alerts.showAlert("Success", "Valid Login");
          this.navCtrl.push(TabsPage);
        } else {
          this.alerts.showAlert("Failure", "Invalid Login");
        }
      });
    }).catch(function (error) {
      this.alerts.showAlert("Failure", "Login not responding");
    });
    this.email = this.password = '';
  }

  logout() {
    this.alerts.showLoading();
    this.authService.logout();
    this.alerts.showAlert("Success", "Successfully logout");
  }

  passwordResetPrompt() {
    this.authService.passwordReset();
  }

  NavigateToLink() {
    this.navCtrl.push(RegisterPage);
  }
}
