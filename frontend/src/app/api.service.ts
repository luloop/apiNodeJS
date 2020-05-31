import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'YOUR_API_KEY';

  constructor(private httpClient: HttpClient, private alert: MatSnackBar) { }


  public getNews() {
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
  }

  public logIn(nombre, pass) {
    const headers = {
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded"
    }
    const body = { user: name, password: pass }

    return this.httpClient.post<any>('https://backcero.rj.r.appspot.com/login', body, { headers }).subscribe(
      res => {
        console.log('HTTP response', res
        )
      },
      err => {
        this.alert.open(err.error.error);
        console.log('HTTP Error', err)
      }
    )

  }
  public traerIndustrias() {
    return this.httpClient.get('https://backcero.rj.r.appspot.com/industrias/id');
  }


}