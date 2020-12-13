import { Injectable } from '@angular/core';
import { ProfilService } from '../Services/profil.service';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private profilService: ProfilService, private authService: AuthService) { }

  getUsers(pageIndex?: number){
    return this.authService.get('/api/admin/users?page='+pageIndex);
  }

}
