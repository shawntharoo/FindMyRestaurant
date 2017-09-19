import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { LoginPage } from '../Login/Login';
import { AlertsService } from '../providers/alerts.service';
import { handleDataService } from '../providers/handleData.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'Page-Register',
  templateUrl: 'Register.html'
})

export class RegisterPage {
  Remail: string;
  Rpassword: string;
  public resp;
  langs;
  langForm;

  constructor(public navCtrl: NavController, public authService: AuthService, public alerts: AlertsService, public hadleData: handleDataService) {
    this.langForm = new FormGroup({
      "langs": new FormControl({ value: 'seeker', disabled: false })
    });
  }

  signup() {
    console.log('Submitting form', this.langForm.value.langs);
    this.alerts.showLoading();
    this.authService.signup(this.Remail, this.Rpassword).then((response) => {
      this.authService.user.subscribe(res => {
        this.resp = res;
        if (this.resp != null) {
          this.hadleData.registerRole(this.resp.email, this.langForm.value.langs);

          // this.af.list('/Role/tharoo@gmail').push({UserEmail : "tharooshawn@gmail.com", UserRole :this.langForm.value.langs}); 

          this.alerts.showAlert("Success", "Successfully Registered");
          this.navCtrl.push(LoginPage);
        } else {
          this.alerts.showAlert("Failure", "Registration Failed");
        }
      });
    }).catch(function (error) {
      this.alerts.showAlert("Failure", "Register Error");
    });
    this.Remail = this.Rpassword = '';
  }

  NavigateToLink() {
    this.navCtrl.push(LoginPage);
  }

}
