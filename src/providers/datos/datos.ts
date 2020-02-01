import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';

/*
  Generated class for the DatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatosProvider {
  //db:any;
  constructor(public http: HttpClient, private db: AngularFirestore, private afAuth:AngularFireAuth) {
  }

  get Session(){
    return this.afAuth.authState;
  }

  async Logout(){

    try {
      const user = await this.afAuth.auth.signOut();
      return await Promise.resolve(user);
    }
    catch (err) {
      return await Promise.reject(err);
    }
  }

  //Comprobación de Login.
  async LoginUser(email:string, password:string){
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return await Promise.resolve(user);
    }
    catch (err) {
      return await Promise.reject(err);
    }
  }


  //Este método agrega los datos ingame del usuario, como su nick o su puntuación máxima, en cloud Firestore.
  AddUser(usuario:string, email:string, MaxRecord:number){

    this.db.collection("usuarios").doc(usuario).set({
      user: usuario,
      email: email,
      MaxRecord: MaxRecord
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

  }

  //Este método agrega datos al autenticador para poder hacer los logins y asegurar los datos de sesion.
  async RegisterUser(email:string, password:string){

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    catch (err) {
      return await Promise.reject(err);
    }
    
  }

}
