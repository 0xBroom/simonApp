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

  // AddUser(usuario:string, passw:string){
  //   // Añade un nuevo documento (Linea) a la colección (Tabla) "usuarios"
  //   this.db.collection("usuarios").doc(usuario).set({
  //     user: usuario,
  //     pass: passw
  //   })
  //   .then(function() {
  //     console.log("Document successfully written!");
  //   })
  //   .catch(function(error) {
  //     console.error("Error writing document: ", error);
  //   });

  // }

  async RegisterUser(email:string, password:string){
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    catch (err) {
      return await Promise.reject(err);
    }
  }

}
