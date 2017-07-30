import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Component imports
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/Login/Login';
import { RegisterPage } from '../pages/Register/Register';
import { AuthService } from '../pages/providers/auth.service';
import { RestaurantsPage } from '../pages/Restaurants/Restaurants';
import { SelectionPage } from '../pages/Selection/Selection';
import { OLoginPage } from '../pages/OLogin/OLogin';
import { ORegisterPage } from '../pages/ORegister/ORegister';

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
    TabsPage,
    LoginPage,
    RegisterPage,
    RestaurantsPage,
    SelectionPage,
    OLoginPage,
    ORegisterPage
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
    TabsPage,
    LoginPage,
    RegisterPage,
    RestaurantsPage,
    SelectionPage,
    OLoginPage,
    ORegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
