import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { handleDataService } from '../providers/handleData.service';
import { FileChooser } from '@ionic-native/file-chooser';
import firebase from 'firebase';

@Component({
    selector: 'ownerHotelCreate-modal',
    templateUrl: 'ownerHotelCreate-modal.html'
})
export class OwnerHotelCreateModalPage {

    form: FormGroup;
    nativepath: any;
    firestore = firebase.storage();

    constructor(public viewCtrl: ViewController, formBuilder: FormBuilder, public handleService: handleDataService, public fileChooser: FileChooser) {
        this.form = formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
        handleService.seekerDetails();
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    createItem() {
        this.handleService.createHotel(this.form.value);
        this.viewCtrl.dismiss();
    }

    store() {
        this.fileChooser.open().then((url) => {
            (<any>window).FilePath.resolveNativePath(url, (result) => {
                this.nativepath = result;
                this.uploadimage();
            }
            )
        })
    }

    uploadimage() {
        (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                    var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                    var imageStore = this.firestore.ref().child('Restaurants');
                    imageStore.put(imgBlob).then((res) => {
                        alert('Upload Success');
                    }).catch((err) => {
                        alert('Upload Failed' + err);
                    })
                }
            })
        })
    }
}