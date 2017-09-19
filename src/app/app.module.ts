import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';

//Component imports
import { MyApp } from './app.component';
import { SeekerTabsPage } from '../pages/SeekerTabs/SeekerTabs';
import { LoginPage } from '../pages/Login/Login';
import { RegisterPage } from '../pages/Register/Register';
import { AuthService } from '../pages/providers/auth.service';
import { RestaurantsPage } from '../pages/Restaurants/Restaurants';
import { OwnerTabsPage } from '../pages/OwnerTabs/OwnerTabs';
import { SeekerSettingsPage } from '../pages/SeekerSettings/SeekerSettings';
import { OwnerHotelsDisplayPage } from '../pages/OwnerHotelsDisplay/OwnerHotelsDisplay';
import { OwnerHotelCreateModalPage } from '../pages/OwnerHotelCreate/OwnerHotelCreate-modal';
import { AlertsService } from '../pages/providers/alerts.service';
import { handleDataService } from '../pages/providers/handleData.service';

//Firebase configurations and imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
export const firebaseConfig = {
  apiKey: "AIzaSyBdeVYI2jioq3CX5fnYWDtAo5_zXAsT5NQ",
  authDomain: "mymenu-fab5b.firebaseapp.com",
  databaseURL: "https://mymenu-fab5b.firebaseio.com",
  projectId: "mymenu-fab5b",
  storageBucket: "mymenu-fab5b.appspot.com",
  messagingSenderId: "403543278528"
};

@NgModule({
  declarations: [
    MyApp,
    SeekerTabsPage,
    LoginPage,
    RegisterPage,
    RestaurantsPage,
    SeekerSettingsPage,
    OwnerTabsPage,
    OwnerHotelsDisplayPage,
    OwnerHotelCreateModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SeekerTabsPage,
    LoginPage,
    RegisterPage,
    RestaurantsPage,
    SeekerSettingsPage,
    OwnerTabsPage,
    OwnerHotelsDisplayPage,
    OwnerHotelCreateModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileChooser,
    Transfer,
    Camera,
    FilePath,
    AuthService,
    AlertsService,
    handleDataService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
