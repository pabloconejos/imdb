import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../../core/services/tmdb.service';
import { Movie } from '../../../../interfaces/Movie';
import { FavoritasService } from '../../../../core/services/favoritas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { OpinionService } from '../../../../core/services/opinion.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrl: './ficha.component.scss'
})
export class FichaComponent implements OnInit{
  movieId?: string;
  movie!: Movie
  opinionForm: FormGroup
  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    public favService: FavoritasService,
    private fb: FormBuilder,
    private opinionService: OpinionService
  ) {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!; // Obtiene el ID de la ruta
      this.tmdb.getOneMovie(this.movieId).subscribe(movie => {
        console.log('ficha => ',movie);
        this.movie = movie;
        this.setOpinion(movie.id)
      });
    });

    this.opinionForm = this.fb.group({
      critica: [''],
      rating: [0]
    })

    this.opinionForm.get('critica')?.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onSubmit()
    });
  }

  ngOnInit(): void {

  }


  setOpinion(movieId: number) {
    const opinion = this.opinionService.getOpinion(movieId)
    if (opinion) {
      this.opinionForm.setValue({
        critica: opinion.critica,
        rating: opinion.rating
      })
    }
  }

  getScore(ev: number): void {
    this.opinionForm.patchValue({
      rating: ev,
    });
    this.onSubmit()
  }


  toogleFav(movieId: number) {
    this.favService.setFavorita({id: movieId})
  }

  onSubmit() {
    if (this.opinionForm.valid) {
      this.opinionService.setOpinion(this.movie.id,this.opinionForm.value)
    }
  }
}
