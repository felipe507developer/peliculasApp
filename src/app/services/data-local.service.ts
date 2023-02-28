import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService implements OnInit {
  peliculas: PeliculaDetalle[] = [];
  private _storage: Storage = new Storage;

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.initDB();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: "top",
      duration: 1500
    });
    toast.present();
  }

  ngOnInit() {

  }

  async initDB() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }


    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;

  }

  
  async cargarFavoritos() {

    const peliculas = await this._storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id: number ) {

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }
}
