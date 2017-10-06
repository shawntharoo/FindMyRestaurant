import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { handleDataService } from '../providers/handleData.service';
import { seekerData } from '../../Models/SeekerDetails';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'Page-SeekerSettings',
  templateUrl: 'SeekerSettings.html'
})

export class SeekerSettingsPage implements OnInit {

  captureDataUrl: string;
  profile: FirebaseObjectObservable<seekerData[]>;
  private imageSrc: string;
  userImage: string;
  editMode: boolean = false;
  form: FormGroup;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, private camera: Camera, public handleService: handleDataService) {
    // af.object('/UserProfile/s@g,com').subscribe(snapshot => {
    //     console.log(snapshot);
    // });
    this.form = new FormGroup({
      place: new FormControl(),
      category: new FormControl()
    })
  }

  ngOnInit() {
    this.handleService.getUserEmail().subscribe(res => {
      this.handleService.seekerDetails(res.email).subscribe(response => {
        this.profile = response;
      });
      this.handleService.firebaseStorageDownload(res.email).then(url => this.userImage = url);
    })
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

  toggleMode() {
    this.editMode = !this.editMode;
  }

  editedSeekerData() {
    this.handleService.getUserEmail().subscribe(res => {
      this.handleService.updateSeeker(this.form.value, res.email).then(data => {
        let res = data;
        console.log("Successfully Saved", res)
      });
    });
  }
}
