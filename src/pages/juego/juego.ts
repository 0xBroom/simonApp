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

  highscore:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datos:DatosProvider) {
    datos.GetUserMaxRecord().then((respuesta:any) =>{
      this.highscore = respuesta;
      console.log(respuesta);
      
    }).catch((error:any) =>{
      console.log("Ha habido un error "+error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

}
