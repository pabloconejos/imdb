import { Injectable } from '@angular/core';
import { IOpinion } from '../../interfaces/IOpinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  opiniones = new Map<number, IOpinion>();

  constructor() {
    this.opiniones = this.getOpinionFromLocalStorage()
  }

  getOpinionFromLocalStorage() {
    try {
      const opinionesString = localStorage.getItem('opiniones');
      if (opinionesString) {
        const opinionesArray = JSON.parse(opinionesString) as Array<[number, IOpinion]>;
        return new Map(opinionesArray);
      }
    } catch (e) {
      console.error('Ocurrió un error al cargar desde localStorage:', e);
    }
    console.log(this.opiniones)
    return new Map();
  }

  setOpinion(movieId: number,opinion: IOpinion) {
    const nuevaOpinion: IOpinion = {
      critica: opinion.critica,
      rating: opinion.rating
    };

    this.opiniones.set(movieId, nuevaOpinion);
    this.saveOpiniones(this.opiniones)
    console.log(this.opiniones)
  }


  getOpinion(movieId: number): IOpinion | undefined {
    return this.opiniones.get(movieId)
  }

  saveOpiniones(opiniones: Map<number, IOpinion>): void {
    try {
      const opinionesArray = Array.from(opiniones);
      localStorage.setItem('opiniones', JSON.stringify(opinionesArray));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.error('No hay suficiente espacio en localStorage para guardar las opiniones.');
    } else {
        console.error('Ocurrió un error al guardar en localStorage:', e);
    }
    }
  }
}
