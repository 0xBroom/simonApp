import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OpcionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opciones',
  templateUrl: 'opciones.html',
})
export class OpcionesPage {

  mute: boolean=true;
  volumen: string="volume-up";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionesPage');
  }

  mutear():void{
    if(this.mute){
      this.mute=false;
      this.volumen="volume-off";
    }else{
      this.mute=true;
      this.volumen="volume-up";
    }
  }
}
