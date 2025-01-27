import { Injectable } from '@angular/core';
import { IFavorita } from '../../interfaces/IFavorita';

@Injectable({
  providedIn: 'root'
})
export class FavoritasService {

  favoritas: IFavorita[] = []
  constructor() {
    this.favoritas = this.getFavoritas()
  }

  getFavoritas(): IFavorita[]  {
    let data = localStorage.getItem('favs')
    if (data) {
      return JSON.parse(data) as IFavorita[];
    }

    return []
  }

  setFavorita(fav: IFavorita){
    if (this.isFavorita({id: fav.id})) {
      this.removeFavorita(fav)
      return;
    }

    this.favoritas.push(fav)
    
    try {
      localStorage.setItem('favs', JSON.stringify(this.favoritas));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.error('No hay suficiente espacio en localStorage para guardar las favoritas.');
      } else {
        console.error('Ocurrió un error al guardar en localStorage:', e);
      }
    }
    
  }

  removeFavorita(fav: IFavorita) {
    const favs = this.favoritas.filter( f => f.id != fav.id )
    this.favoritas = favs
    localStorage.setItem('favs', JSON.stringify(this.favoritas));
  }

  isFavorita(fav: IFavorita){
    return this.favoritas.some( f => f.id == fav.id)
  }
}
