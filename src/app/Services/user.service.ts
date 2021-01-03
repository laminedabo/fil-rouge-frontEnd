import { Injectable } from '@angular/core';
import { ProfilService } from '../Services/profil.service';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private profilService: ProfilService, private authService: AuthService) { }

  getUsers(pageIndex?: number){
    return this.authService.get('/api/admin/users?statut=actif&page='+pageIndex);
  }


  addUser(user:any){
    return this.authService.post('/api/admin/users',user);
  }

  updateUser(user:any, id:number){
    return this.authService.post('/api/admin/users/'+id,user);
  }

  getCount(profil?: number){
    return this.authService.patch('/api/admin/users/count',{'profil':profil});
  }

  search(term:any){
    return this.authService.patch('/api/admin/users/search',term);
  }

  getApprenants(){
    return this.authService.get('/api/admin/users?profil.libelle=APPRENANT');
  }

}
