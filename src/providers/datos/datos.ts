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
   * @description Devuleve la sesion actual que hay en el autenticador.
   */
  get Session(){
    return this.afAuth.authState;
  }

  /**
   * @async
   * @description cierra la sesion.
   * @returns {Promise}
   */
  async Logout(): Promise<any>{
    try {
      const user = await this.afAuth.auth.signOut();
      return await Promise.resolve(user);
    }
    catch (err) {
      return await Promise.reject(err);
    }
  }

  /**
   * @async
   * @param {string} email 
   * @param {string} password 
   * @description Comprobación de Login.
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
   * @param {string} usuario Nombre de usuario
   * @param {string} email email del usuario
   * @param {number} MaxRecord puntuación máxima (por defecto es 0)
   * @description Este método agrega los datos ingame del usuario, como su nick o su puntuación máxima, en cloud Firestore.
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
   * @async
   * @param {string} email El email del usuario 
   * @param {string} password Contraseña del usuario
   * @description Este método agrega datos al autenticador para poder hacer los logins y asegurar los datos de sesion.
   * Va de la mano con el método AddUser().
   * @returns {Promise} 
   */
  async RegisterUser(email:string, password:string): Promise<any>{

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return await Promise.resolve(res);
    }
    catch (err) {
      return await Promise.reject(err);
    }
    
  }

  /**
   * @async
   * @param {number} newMaxRecord Nuevo record de usuario.
   * @description Recibe un numero con el nuevo record personal.
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
   * @async
   * @description Devuelve un array de dos datos por cada posición, el nombre de usuario (no el email)
   * y el record, de todos los usuarios registrados.
   * @returns {Promise} promise
   */
  GetRecordList(): Promise<any> {
    //Creamos la promesa.
    let promise = new Promise((resolve, reject) => {
      try {
        let MaxRecords: [string, number][] = [["", 0]];
        this.db.collection("usuarios").get().forEach(function(querySnapshot:any) {
            querySnapshot.forEach(function(doc:any) { //Accedemos al documento y buscamos los campos necesarios.
              MaxRecords.push( [doc.data()["user"], doc.data()["MaxRecord"]] );
            });
        });
        MaxRecords.splice(0,1); //Eliminamos la primera posición que se crea para inicializar el array.
        resolve(MaxRecords);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  /**
   * @async
   * @description Obtiene la puntuación máxima del usuario logeado. 
   * @returns {Promise} promise
   */
  GetUserMaxRecord(): Promise<any> {
    //Creamos la promesa.
    let promise = new Promise( (resolve, reject) => {
      try {
        this.db.collection('usuarios').doc(this.afAuth.auth.currentUser.email).get()
        .forEach((doc:any)=>{ //Accedemos al documento y buscamos el campo necesario
          resolve(doc.data()["MaxRecord"]);
        });
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  //TODO: Nuevo campo boolean en la base de datos para controlar el sonido en la aplicación.

}
