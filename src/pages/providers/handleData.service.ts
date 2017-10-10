import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AlertsService } from './alerts.service';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class handleDataService {
    validEmail: string;
    public userProfile;
    storageRef: firebase.storage.Reference;

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
        this.authService.user.subscribe(res => {
            const imageRef = firebase.storage().ref().child(`SeekerProfile/${res.email}.jpg`);
            imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
                this.alertService.showAlert("success", "Successfully Uploaded");
            })
        });
    }

    createHotel(hotel, imgBlob) {
        this.authService.user.subscribe(res => {
            this.af.list('Restaurants/' + this.emailToKey(res.email)).push({
                Name: hotel.name,
                Description: hotel.description
            });

            var imageStore = firebase.storage().ref().child('Restaurants/' + this.emailToKey(res.email) + '/' + hotel.name);
            imageStore.put(imgBlob).then((res) => {
                this.alertService.showAlert("success", "Successfully Uploaded");
            }).catch((err) => {
                this.alertService.showAlert("Error", "Uploade failed");
            })
        });
    }

    ownerHotels(email) {
        let userEmail = this.emailToKey(email);
        let restaurants = this.af.list('/Restaurants/' + userEmail);
        return restaurants;
    }

    getUserEmail() {
        return this.authService.user;
    }

    seekerDetails(email) {
        let userEmail = this.emailToKey(email);
        return this.af.object('/UserProfile/' + userEmail);
    }

    firebaseStorageDownload(imageUrl) {
        this.storageRef = firebase.storage().ref().child('SeekerProfile/' + imageUrl + '.jpg');
        // this.storageRef.getDownloadURL().then(url => console.log(url));
        return this.storageRef.getDownloadURL();
    }

    updateSeeker(data, email) {
        let userEmail = this.emailToKey(email);
        return this.af.object('/UserProfile/' + userEmail).update({
            LivingPlace: data.place,
            FoodCategory: data.category
        })
    }

    getRestaurants() {
        let restaurants = this.af.list('/Restaurants');
        return restaurants;
    }

    getResturantsFromKeys(key){
        let rest = this.af.list('/Restaurants/'+ key);
        return rest;
    }


    getRetuarantImageformStorage(res, hotelName) {
        this.storageRef = firebase.storage().ref().child('Restaurants/' + this.emailToKey(res.email) + '/' + hotelName);
        return this.storageRef.getDownloadURL();
    }
}