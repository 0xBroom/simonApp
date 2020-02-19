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
    this.datosProvider.GetRecordList().then((respuesta:any) => {
      let data = respuesta;
      this.datos = this.sortByColumn(data, 1);
    }).catch((error:any) => {
      console.log("Ha habido un error "+error);
    })
  }

  sortByColumn(a:[string, number][], colIndex:number){

    a.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[colIndex] === b[colIndex]) {
            return 0;
        }
        else {
            return (a[colIndex] < b[colIndex]) ? -1 : 1;
        }
    }

    return a;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasPage');
  }
}
