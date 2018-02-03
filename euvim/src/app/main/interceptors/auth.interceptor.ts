import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let item = JSON.parse(sessionStorage.getItem("access"));
    let validacao = item && item.access_token != null;
    if(validacao){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${item.token_access}`
        }
      });
      return next.handle(request);
    }
  }
}