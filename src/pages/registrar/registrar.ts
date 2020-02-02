import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DatosProvider } from './../../providers/datos/datos';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  
  user = {email:'', name:'', passw:'', MaxRecord:0};

  constructor(public navCtrl: NavController, public navParams: NavParams, public datosProvider:DatosProvider, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  Signin(){
    this.datosProvider.RegisterUser(this.user.email, this.user.passw).then((userr) => {
      //El Usuario se ha creado correctamente, añadimos los datos in-game a la bd.
      this.datosProvider.AddUser(this.user.name, this.user.email, this.user.MaxRecord);
      this.navCtrl.push(HomePage);
    }).catch((err) => {
      let alert = this.alertCtrl.create({
        title:'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

}
