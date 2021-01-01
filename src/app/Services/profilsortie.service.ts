import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilsortieService {

  constructor(private authService: AuthService) { }

  getProfilsorties(){
    return this.authService.get('/api/admin/profilsorties');
  }

  getProfilsortie(id: number){
    return this.authService.get('/api/admin/profilsorties/'+id);
  }

  addProfilsortie(profilsortie:any){
    return this.authService.post('/api/admin/profilsorties',profilsortie);
  }

  updateProfilsortie(profilsortie:any, id:number){
    return this.authService.post('/api/admin/profilsorties/'+id,profilsortie);
  }
}
