import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatosProvider } from './../providers/datos/datos';

import { HomePage } from '../pages/home/home';

import { timer }  from 'rxjs/observable/timer';
import { MenuPage } from '../pages/menu/menu';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private datosProvider:DatosProvider, private audio:SmartAudioProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
      audio.preload("success", "assets/cinf.mp3");
      audio.preload("red", "assets/r.mp3");
      audio.preload("blue", "assets/b.mp3");
      audio.preload("green", "assets/g.mp3");
      audio.preload("yellow", "assets/y.mp3");

      this.datosProvider.Session.subscribe(session =>{
        if(session)
        {
          //Si está en sesión llevará directamente al menu de app.
          this.rootPage=MenuPage;
        }
        else
        {
          //Si no llevará a la página de Login.
          this.rootPage = HomePage;
        }
      })
    });
  }
}

