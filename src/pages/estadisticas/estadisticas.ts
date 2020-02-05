import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from './../../providers/datos/datos';

/**
 * Generated class for the EstadisticasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})

export class EstadisticasPage {

  datos: [string, number][];

  constructor(public navCtrl: NavController, public navParams: NavParams, public datosProvider:DatosProvider) {
    this.datos=this.datosProvider.GetRecordList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasPage');
  }
}
