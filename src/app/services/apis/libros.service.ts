import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  urlBase = environment.url_api_base;

  constructor(private http: HttpClient) { }

  getUrlLibros(){
    return `${this.urlBase}/libros`;
  }
}
