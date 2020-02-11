import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from '../../providers/datos/datos'
import { AlertController } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
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

  private highscore:number = 0;
  private sequence:String [] = [this.getRandomColor()];
  private r_sel:String;
  private r_hover:String;
  private b_sel:String;
  private b_hover:String;
  private g_sel:String;
  private g_hover:String;
  private y_sel:String;
  private y_hover:String;
  private alert:any;
  private input:boolean = false;
  private pos:number = 0;
  private score:number =0;
  private showCheck = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public datos:DatosProvider, public alertCtrl: AlertController, public audio:SmartAudioProvider) {
    //this.highscore = datos.GetUserMaxRecord();
    datos.GetUserMaxRecord().then((res:any)=>{
      this.highscore = res;
    }).catch((error:any)=>{
      this.highscore = 0;
    });
      this.sequence.push(this.getRandomColor());
      console.log(this.sequence);
      setTimeout(()=>{
        this.playsequence();
      }, 800);

      this.alert = alert;
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
              this.audio.play("red");
              break;
            case "blue": this.b_sel = "b-sel";
              this.audio.play("blue");
              break;
            case "green": this.g_sel = "g-sel";
              this.audio.play("green");
              break;
            case "yellow": this.y_sel = "y-sel";
              this.audio.play("yellow");
              break;
          }
          i+=1;
        }, 100);      
      }      
    }, 800);   
  }

  //Permite que el usuario haga inputs
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

  //Verifica si el input es correcto
  checkInput(color:String){
    if(this.input){
      //Switch para el sonido
      switch(color){
        case "red":this.audio.play("red");
          break;
        case "blue":this.audio.play("blue");
          break;
        case "green":this.audio.play("green");
          break;
        case "yellow":this.audio.play("yellow");
          break;
      }
      if(color != this.sequence[this.pos]){
        //Incorrecto
        if(this.highscore < this.score){
          this.datos.SetMaxRecord(this.score);
          this.highscore = this.score;
        }
        this.showAlert();        
        
      }else{
        //Correcto
        this.score += 1;
        if(this.pos == this.sequence.length-1){
          //Sequencia completada
          this.sequence.push(this.getRandomColor());
          this.showCheck = true;
          this.allowInput(false);
          this.pos = 0;
          this.audio.play("success");
          setTimeout(()=>{
              this.showCheck = false;
              this.playsequence();
          }, 1500);    
        }else{
          this.pos += 1;
        }       
      }
    }
  }

  reset():void{
    this.score = 0;
    this.pos = 0;
    this.sequence = [this.getRandomColor(), this.getRandomColor()];
  }

  showAlert():void{
    this.alert = this.alertCtrl.create({
      title: '¡Has perdido!',
      message: '¿Intentar de nuevo?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'No, salir',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.pop();
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.reset();
            this.playsequence();
          }
        },
      ]
    });

    this.alert.present();
  }


}
