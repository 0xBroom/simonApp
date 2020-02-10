import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from '../../providers/datos/datos'
import { NgClass } from '@angular/common';

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

  private highscore:String = "0";
  private sequence:String [] = [this.getRandomColor()];
  private r_sel:String;
  private r_hover:String;
  private b_sel:String;
  private b_hover:String;
  private g_sel:String;
  private g_hover:String;
  private y_sel:String;
  private y_hover:String;
  private input:boolean = false;
  private pos:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datos:DatosProvider) {
    //this.highscore = datos.GetUserMaxRecord();
    datos.GetUserMaxRecord().then((res:any)=>{
      this.highscore = res;
    }).catch((error:any)=>{
      this.highscore = "N/A";
    });
    for(let i =0;i<10;i++){
      this.sequence.push(this.getRandomColor());
    }
      console.log(this.sequence);
      setTimeout(()=>{
        this.playsequence();
      }, 800);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

  //Genera y devuelve un color aleatorio
  getRandomColor():String{
    var color:String;
    var num:number; 

    num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

    switch(num){
      case 1: color = "red";
        break;
      case 2: color = "blue";
        break;
      case 3: color = "green";
        break;
      case 4: color = "yellow";
        break;
    }
    
    return color;
  }

  //Reproduce la sequencia
  playsequence():void{
    var i = 0;
    var timer;

    timer = setInterval(()=>{
      //Reset 
      this.r_sel = ""; 
      this.b_sel = "";
      this.g_sel = "";
      this.y_sel = ""; 

      
      if(this.sequence.length == i){
        //Stop
        clearInterval(timer);
        this.allowInput(true);
      }else{
        //show btn
        setTimeout(()=>{
          switch(this.sequence[i]){
            case "red": this.r_sel = "r-sel";
              break;
            case "blue": this.b_sel = "b-sel";
              break;
            case "green": this.g_sel = "g-sel";
              break;
            case "yellow": this.y_sel = "y-sel";
              break;
          }
          i+=1;
        }, 100);      
      }      
    }, 800);   
  }

  allowInput(allow:Boolean):void{
    if(allow){
        this.r_hover = "r-hover";
        this.b_hover = "b-hover";
        this.g_hover = "g-hover";
        this.y_hover = "y-hover";
        this.input = true;
    }else{
        this.r_hover = "";
        this.b_hover = "";
        this.g_hover = "";
        this.y_hover = "";
        this.input = false;
    }
  }

  checkInput(color:String){
    if(this.input){
      if(color != this.sequence[this.pos]){
        //Incorrecto
      }else{
        //Correcto
        if(this.pos == this.sequence.length-1){
          //Sequencia completada
        }else{
          this.pos += 1;
        }       
      }
    }
  }


}
