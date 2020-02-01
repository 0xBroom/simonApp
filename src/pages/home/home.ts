import { Component } from '@angular/core';
import { DatosProvider } from './../../providers/datos/datos';
import {  NavController, NavParams, AlertController } from 'ionic-angular';

import { RegistrarPage } from '../registrar/registrar';
import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {email:'', password:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public datosProvider:DatosProvider, public alertCtrl:AlertController) {}

  Login(){
    this.datosProvider.LoginUser(this.user.email, this.user.password)
    .then((userr)=>{
      //Login correcto.
      this.menu();
    }).catch( (err) => {
      let alert = this.alertCtrl.create({
        title:'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

  registrarse():void{
    this.navCtrl.push(RegistrarPage);
  }

  menu():void{
    this.navCtrl.push(MenuPage);
  }

}
