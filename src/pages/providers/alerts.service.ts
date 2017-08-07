import { Injectable } from '@angular/core';
import { AlertController,LoadingController} from 'ionic-angular';


@Injectable()
export class AlertsService {
  loader: any; 
  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  
  showAlert(title, message) {
    setTimeout(() => {
        this.loader.dismiss();
      });
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }

}