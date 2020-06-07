import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'YOUR_API_KEY';

  constructor(private httpClient: HttpClient, private alert: MatSnackBar, private router: Router) { }


  public getNews() {
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
  }

  public logIn(nombre, pass) {
    const headers = {
      "cache-control": "no-cache",
      'content-type': 'application/json'
    }
    const body = { user: nombre, password: pass };

    /* return this.httpClient.post<any>('/login', JSON.stringify(body), { headers }); */
    return this.httpClient.post<any>('https://us-central1-luloopprueba.cloudfunctions.net/app/login', JSON.stringify(body), { headers });

  }
  public traerIndustrias() {
    return this.httpClient.get('https://us-central1-luloopprueba.cloudfunctions.net/app/industrias/id');
  }


}