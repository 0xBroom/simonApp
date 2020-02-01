import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  registrarse():void{
    this.navCtrl.push(RegistrarPage);
  }

  menu():void{
    this.navCtrl.push(MenuPage);
  }

}
