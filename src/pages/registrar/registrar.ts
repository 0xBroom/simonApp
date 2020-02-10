import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
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
  
  user = {email:'', name:'', passw:'' , reppassw:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public datosProvider:DatosProvider, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  Signin(){
    if(this.user.name.length<9){
      if(this.user.passw == this.user.reppassw){
        this.datosProvider.AddUser(this.user);
        this.navCtrl.push(HomePage);
      }else{
        let alert = this.alertCtrl.create({
          title:'Error',
          subTitle: 'Las contraseñas no coinciden.',
          buttons: ['Aceptar']
        });
        alert.present();
      }
    }else{
      let alert = this.alertCtrl.create({
        title:'Error',
        subTitle: 'El nombre de usuario solo puede contener 8 carácteres.',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

}
