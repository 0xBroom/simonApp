import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { DatosProvider } from './../../providers/datos/datos';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {email:'', passw:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public datosProvider:DatosProvider, public alertCtrl:AlertController) {}

  Signin(){
    this.datosProvider.RegisterUser(this.user.email, this.user.passw).then((userr) => {
      //El Usuario se ha creado correctamente.
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
