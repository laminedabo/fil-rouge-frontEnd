import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JWTTokenService } from './jwt-helper.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorService implements HttpInterceptor{

  constructor( private jwtService: JWTTokenService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = this.jwtService.getToken();
    if (token !== null && request.url!='/api/login_check') {
      if (this.jwtService.isTokenExpired()) {
        console.log('expired token');
        this.router.navigateByUrl('/login');
        return
      }
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });    
    }

    if (request.method==='POST' && request.url==='/api/admin/users') {
      request = request.clone({ headers: request.headers.set('Accept', '*/*')});
    }
    // else if (!request.headers.has('Content-Type')){
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json')})
    // }
    
    if (request.method==='GET') {
      request = request.clone({ headers: request.headers.set('Accept', 'application/json')});
    }
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event
        }
        return
      })
    )
  }
}
