import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBase = environment.url_api_base;

  constructor(private http: HttpClient) { }

  getUrlLogin(){
    return `${this.urlBase}/usuario/login`;
  }
  
}
