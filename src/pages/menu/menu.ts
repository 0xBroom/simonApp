import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JuegoPage } from '../juego/juego';
import { OpcionesPage } from '../opciones/opciones';
import { EstadisticasPage } from '../estadisticas/estadisticas';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  iniciarjuego():void{
    this.navCtrl.push(JuegoPage);
  }

  opciones():void{
    this.navCtrl.push(OpcionesPage);
  }

  estadisticas():void{
    this.navCtrl.push(EstadisticasPage);
  }
}
