import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from "@angular/common/http";

//Modulos de fire base para la bd y para la auteticación.
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "angularfire2/auth";
export const firebaseConfig = { //Claves de autenticación de firebase.
  apiKey: "AIzaSyB_3BsGcCHTdhKtI_VsH6781E4edtyYwQM",
    authDomain: "simonapp-46c44.firebaseapp.com",
    databaseURL: "https://simonapp-46c44.firebaseio.com",
    projectId: "simonapp-46c44",
    storageBucket: "simonapp-46c44.appspot.com",
    messagingSenderId: "126825119697",
    appId: "1:126825119697:web:e909402df313e377c3eaf0"
};

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatosProvider } from '../providers/datos/datos';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatosProvider
  ]
})
export class AppModule {}
