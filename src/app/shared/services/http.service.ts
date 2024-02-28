import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService, ToastType } from './toast.service';
import { Toast } from 'primeng/toast';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  private BASE_URL: string = 'https://bbcdotnetcore6api2.azurewebsites.net';

  constructor(private _http: HttpClient, private _toastService: ToastService) {}

  get(url: string, params?: any): Observable<T> {
    const data = { params };
    return this._http
      .get<T>(this.BASE_URL + url, data)
      .pipe(catchError((error: any) => this.errorHandler(error)));
  }

  post(url: string, body: any): Observable<T> {
    return this._http
      .post<T>(`${this.BASE_URL}${url}`, body)
      .pipe(catchError((error: any) => this.errorHandler(error)));
  }

  private errorHandler(response: any): Observable<never> {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      // TODO: Handle 401 status not authorized
      this._toastService.showToast(ToastType.Error, 'You are not authorized!');
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      //when not connected to internet
      this._toastService.showToast(
        ToastType.Error,
        'Connection Error',
        'Please Check your Internet Connection'
      );
    } else {
      message = key + ' : ' + message;
    }

    //shows error message in console
    console.error('API Error:', response);

    return throwError({
      messages: message,
      error: error,
    });
  }
}
