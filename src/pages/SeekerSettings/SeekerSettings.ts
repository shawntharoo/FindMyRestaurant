import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { handleDataService } from '../providers/handleData.service';

@Component({
  selector: 'Page-SeekerSettings',
  templateUrl: 'SeekerSettings.html'
})

export class SeekerSettingsPage {

  captureDataUrl: string;
  profile: FirebaseObjectObservable<any[]>;
  private imageSrc: string;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, private camera: Camera, public handleService: handleDataService) {
    this.handleService.seekerDetails();
    // this.profile = af.object('/UserProfile/tharoo@gmail');
    //  this.profile.subscribe(snapshot => {
    //     console.log(snapshot);
    // });
  }

  capture() {
    const cameraOptions:
      CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  openGallery() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }
    this.camera.getPicture(cameraOptions)
      .then(file_uri => this.imageSrc = 'data:image/jpeg;base64,' + file_uri,
      err => console.log(err));
  }

  uploadImage() {
    if (this.captureDataUrl) {
      this.handleService.upload(this.captureDataUrl);
    } else {
      this.handleService.upload(this.imageSrc);
    }
  }

}
