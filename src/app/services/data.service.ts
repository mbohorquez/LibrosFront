import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) { }

   /* GET */
   get<T>(url: string, httpParams?: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.get<T>(url,
      {
        headers: httpHeaders,
        params: httpParams,
        observe: 'response'
      });
  }

  /* POST */
  post<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.post<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }

  /* PUT */
  put<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.put<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }

  /* DEL */
  delete<T>(url: string, params?: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.delete<T>(url,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }

  getHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = this.securityService.GetToken();
  
    if (token) {
      const decode = this.getDecodedAccessToken(token);
      this.securityService.SetDataUser(decode.id, decode.nombre);
      httpHeaders = httpHeaders.append('Authorization',"Bearer " +token);
    }
  
    // Agregar otros encabezados según sea necesario
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
  
    return httpHeaders;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
