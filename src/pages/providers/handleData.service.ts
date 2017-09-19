import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import * as fireStorage from 'firebase/storage';
import { Observable } from 'rxjs/Observable';
import { AlertsService } from './alerts.service';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class handleDataService {
    validEmail: string;
    public loggedInUser;
    constructor(public alertService: AlertsService, public authService: AuthService, public af: AngularFireDatabase) {
    }

    registerRole(email, role) {
        this.validEmail = email;
        firebase.database().ref('UserProfile').child(this.emailToKey(email)).set({
            UserRole: role
        });
    }

    findUsersMatchingEmail(email) {
        let key = this.emailToKey(email);
        return Observable.create((observer => {
            firebase.database().ref('UserProfile').child(this.emailToKey(key))
                .once('value', function (snap) {
                    observer.next(snap.val());
                });
        }))
    }

    emailToKey(emailAddress) {
        return emailAddress.replace(/[.]/g, ',');
    }

    upload(captureDataUrl) {
        let storageRef = fireStorage.storage().ref();
        const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child(`Restaurants/${filename}.jpg`);
        imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
            this.alertService.showAlert("success", "Successfully Uploaded");
        });
    }

    createHotel(hotel) {
        this.authService.user.subscribe(res => {
            this.af.list('Restaurants/' + this.emailToKey(res.email)).push({
                Name: hotel.name,
                Description: hotel.description
            });
        });
    }

    ownerHotels() {
        this.authService.user.subscribe(res => {
            firebase.database().ref('Restaurants/' + this.emailToKey(res.email));
        });
    }

    seekerDetails() {
        this.loggedInUser = this.authService.user.subscribe(res => {
            this.af.list('/UserProfile/'+ this.emailToKey(res.email));
        });
    }
}