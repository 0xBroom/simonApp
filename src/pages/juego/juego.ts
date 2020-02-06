import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from '../../providers/datos/datos'

/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class JuegoPage {

  private highscore:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datos:DatosProvider) {
    this.highscore = datos.GetUserMaxRecord();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

}
