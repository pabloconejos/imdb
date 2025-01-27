import { Component, OnDestroy, OnInit } from '@angular/core';
import { TmdbService } from '../../../../core/services/tmdb.service';
import { MovieSearch, MovieSearchRoot } from '../../../../interfaces/MovieSearch';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy{

  private searchSubject = new Subject<string>();
  private subscription: Subscription | null = null;

  paginationInfo = {
    itemsPerPage: 20,
    currentPage: 1,
    total_pages: 0,
    total_results: 0
  };
  
  movies: MovieSearch[] = [];
  paginationArray: number[] = [];
  
  constructor(
    private tmdb: TmdbService,
    private _route: ActivatedRoute,
    private router: Router
  ) 
    
  {
     
    this._route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.paginationInfo.currentPage = currentPage
    });

    this.subscription = this.searchSubject.pipe(
      debounceTime(300), // Espera 300 ms después de cada tecla para reducir llamadas
      switchMap((query) => this.tmdb.searchMovie(query)) // Cambia a una nueva llamada de búsqueda y cancela la anterior
    ).subscribe(response => {
      this.movies = response.results
      
    });
    
  }
  
  ngOnInit(): void {
    this.getMovies(this.paginationInfo.currentPage);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Cancela la suscripción
    }
  }
  
  makePagination(info: MovieSearchRoot) {
    this.paginationInfo.total_pages = info.total_pages;
    this.paginationInfo.currentPage = info.page;
    this.paginationInfo.total_results = info.total_results;
    
    const currentPage = this.paginationInfo.currentPage;
    const totalPages = this.paginationInfo.total_pages;
  
    // Genera un rango de paginación adaptativo
    const start = Math.max(1, currentPage - 2); // math.max devuelve el valor mas grande entre dos numeros
    const end = Math.min(totalPages, currentPage + 2); // math.min devuelve el valor mas pequeño entre dos numeros
  
    this.paginationArray = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    /**
     * 
     * Supongamos que:
      start = 2
      end = 6

      El primer argumento { length: end - start + 1 } define un array de longitud 6 - 2 + 1 = 5. Así que el array tendrá 5 elementos.
      
      La función de mapeo (_, i) => i + start genera los valores [2, 3, 4, 5, 6], porque:
      Para i = 0, el valor es 0 + 2 = 2
      Para i = 1, el valor es 1 + 2 = 3
      Para i = 2, el valor es 2 + 2 = 4
      Para i = 3, el valor es 3 + 2 = 5
      Para i = 4, el valor es 4 + 2 = 6
      Finalmente, el array paginationArray queda con los valores [2, 3, 4, 5, 6].
     * 
     */
  }
  
  changePage(page: number) {
    if (page > 0 && page <= this.paginationInfo.total_pages) {
      this.getMovies(page);
      this.router.navigate([], {
        relativeTo: this._route,
        queryParams: { page: page },  // Cambia el parámetro 'page'
        queryParamsHandling: 'merge'  // Mantiene otros parámetros de la URL
      });
    }
  }
  
  getMovies(page = 1) {
    this.tmdb.getMovies(page).subscribe((movies: MovieSearchRoot) => {
      this.movies = movies.results;
      this.makePagination(movies);
    });
  }

  search(ev: Event) {
    const inputValue = (ev.target as HTMLInputElement).value;
    if (inputValue.length <= 0) {
      this.getMovies(this.paginationInfo.currentPage)
      return
    }
    this.searchSubject.next(inputValue); // Emite el nuevo valor de búsqueda
  }


  goToMovie(movieId: number) {
    this.router.navigate(['dashboard/ficha', movieId]);
  }
  

}
