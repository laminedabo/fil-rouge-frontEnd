import { JWTTokenService } from './jwt-helper.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router,private localStorage: LocalStorageService, private jwt: JWTTokenService) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      //add headers here
    })
  }

  /** POST */
  public login(username: string, password: string): Observable<any>{
    return this.http.post<any>('/api/login_check', {username, password}, this.httpOptions)
  }

  /** GET */
  public get(uri: string): Observable<any>{
    return this.http.get<any>(uri, this.httpOptions)
  }

  /** POST */
  public post(uri: string, data: any): Observable<any>{
    return this.http.post<any>(uri, data, this.httpOptions)
  }

  /** PUT */
  public put(uri: string,data:any): Observable<any>{
    return this.http.put<any>(uri, data, this.httpOptions)
  }

  /** PATCH */
  public patch(uri: string,data:any): Observable<any>{
    return this.http.patch<any>(uri, data, this.httpOptions)
  }

  /** DELETE */
  public delete(uri: string): Observable<any>{
    return this.http.delete<any>(uri, this.httpOptions)
  }

  // Enregostrement du user dans le localStorage
  public Connect(token: string){
    this.localStorage.set("token", JSON.stringify(token));
  }

  // Test de connectivité du user
  public isConnected(){
    return this.localStorage.get("token") && !this.jwt.isTokenExpired();
  }

  // Deconnexion
  public disConnect(){
    if(this.isConnected()){
      this.localStorage.remove("token");
      this.router.navigateByUrl('/login');
    }
  }
}
