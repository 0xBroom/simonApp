import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { JuegoPage } from '../juego/juego';
import { OpcionesPage } from '../opciones/opciones';
import { EstadisticasPage } from '../estadisticas/estadisticas';
import { DatosProvider } from './../../providers/datos/datos';
import { HomePage } from '../home/home';

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

  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, public datosProvider:DatosProvider) {
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

  cerrarSession(){
    this.datosProvider.Logout().then((userr) => {
      //Se ha cerrado sesion correctamente.
      this.navCtrl.push(HomePage);
    }).catch((err) => {
      let alert = this.alertCtrl.create({
        title:'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    });
  }
}
