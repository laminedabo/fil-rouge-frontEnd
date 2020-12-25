import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private authService: AuthService) { }

  getProfils(){
    return this.authService.get('/api/admin/profils');
  } 

  getProfilUsers(id: number){
    return this.authService.get(`/api/admin/users?profil.id=${id}`);
  }
}
