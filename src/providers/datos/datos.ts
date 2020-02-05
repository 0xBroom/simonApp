import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'; //Autenticador para usuarios.
import { AngularFirestore } from '@angular/fire/firestore';//Base de datos.

/*
  Generated class for the DatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatosProvider {

  constructor(public http: HttpClient, private db: AngularFirestore, private afAuth:AngularFireAuth) {
  }

  /**
   * Devuleve la sesion actual que hay en el autenticador.
   */
  get Session(){
    return this.afAuth.authState;
  }

  /**
   * cierra la sesion.
   */
  async Logout(){
    try {
      const user = await this.afAuth.auth.signOut();
      return await Promise.resolve(user);
    }
    catch (err) {
      return await Promise.reject(err);
    }
  }

  /**
   * @param email 
   * @param password 
   * Comprobación de Login.
   */
  async LoginUser(email:string, password:string){
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return await Promise.resolve(user);
    }
    catch (err) {
      return await Promise.reject(err);
    }
  }

  /**
   * @param usuario 
   * @param email 
   * @param MaxRecord 
   * Este método agrega los datos ingame del usuario, como su nick o su puntuación máxima, en cloud Firestore.
   * Va de la mano con el metodo RegisterUser().
   */
  AddUser(usuario:string, email:string, MaxRecord:number){
    this.db.collection("usuarios").doc(email).set({
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

  /**
   * @param email 
   * @param password
   * Este método agrega datos al autenticador para poder hacer los logins y asegurar los datos de sesion.
   * Va de la mano con el método AddUser().
   */
  async RegisterUser(email:string, password:string){

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return await Promise.resolve(res);
    }
    catch (err) {
      return await Promise.reject(err);
    }
    
  }

  /**
   * @param newMaxRecord 
   * Recibe un numero con el nuevo record personal.
   * Actualiza el record personal del usuario logeado,
   * Los usuarios (autenticador) y la bd (cloudFirestore) están relacionados por el email.
   */
  async SetMaxRecord(newMaxRecord:number){
    //Dentro de doc le paso el correo del usuario actual.
    var user = this.db.collection("usuarios").doc(this.afAuth.auth.currentUser.email);

    try {
      await user.update({
        MaxRecord: newMaxRecord
      });
      console.log("Document successfully updated!");
    }
    catch (error) 
    {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    }
  }

  /**
   * Devuelve un array de dos datos por cada posición, el nombre de usuario (no el email)
   * y el record, de todos los usuarios registrados.
   * @returns MaxRecords;
   */
  GetRecordList():[String, number][]{
    var MaxRecords: [String, number][];
    var users:any;

    users = this.db.collection("usuarios");
    users.get().then(function(querySnapshot:any) {
      querySnapshot.forEach(function(doc:any) {
          MaxRecords.push( [doc.data().get("user"), doc.data().get("MaxRecord")] );
      });
    });

    return MaxRecords;
  }

  //TODO: Método que devuelve la puntuación máxima del usuario en sesion.
  //TODO: Nuevo campo boolean en la base de datos para controlar el sonido en la aplicación.

}
