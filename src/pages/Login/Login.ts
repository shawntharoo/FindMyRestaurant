import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { RegisterPage } from '../Register/Register';
import { SeekerTabsPage } from '../SeekerTabs/SeekerTabs';
import { AlertsService } from '../providers/alerts.service';
import { handleDataService } from '../providers/handleData.service';
import { OwnerTabsPage } from '../OwnerTabs/OwnerTabs';

@Component({
  selector: 'Page-Login',
  templateUrl: 'Login.html'
})

export class LoginPage {
  email: string = "s@g.com";
  password: string = "123456789";
  public resp;

  constructor(public authService: AuthService, public navCtrl: NavController, public alerts: AlertsService, public hadleData: handleDataService) {
  }

  login() {
    let key = this.email;
    this.alerts.showLoading();
    this.authService.login(this.email, this.password).then((response) => {
      this.authService.user.subscribe(res => {
        this.resp = res;
        if (this.resp != null) {
          this.hadleData.findUsersMatchingEmail(key).subscribe(data => {
            if (data.UserRole === "owner") {
              this.alerts.showAlert("Success", "Valid Login");
              this.navCtrl.push(OwnerTabsPage);
            } else if (data.UserRole === "seeker") {
              this.alerts.showAlert("Success", "Valid Login");
              this.navCtrl.push(SeekerTabsPage);
            }
          })
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
