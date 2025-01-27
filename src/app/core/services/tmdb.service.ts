import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { MovieSearchRoot } from '../../interfaces/MovieSearch';
import { Movie } from '../../interfaces/Movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<MovieSearchRoot> {
    const url = `${environment.apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return this.http.get<MovieSearchRoot>(url, { headers });
  }


  searchMovie(title: string): Observable<MovieSearchRoot> {
    const url = `${environment.apiUrl}/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return this.http.get<MovieSearchRoot>(url, { headers });
  }

  getOneMovie(id: any): Observable<Movie> {
    const url = `${environment.apiUrl}/movie/${id}?language=en-US`;

    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return this.http.get<Movie>(url, { headers });
  }



}
