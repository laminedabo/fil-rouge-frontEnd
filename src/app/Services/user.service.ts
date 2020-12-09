import { Injectable } from '@angular/core';
import { User } from '../Entity/User';
import { ProfilService } from '../Services/profil.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private profilService: ProfilService) { }

  profils = this.profilService.getProfils();
  
  users: User[] = [
    {
      id:1,
      nom: "dabo",
      prenom: "ldab",
      email: "ldab@mail.com",
      username: "ldab",
      password: "passe",
      profil: this.profils[0]
    },
    {
      id:2,
      nom: "deme",
      prenom: "ibra",
      email: "dem@mail.com",
      username: "i3d",
      password: "passe",
      profil: this.profils[3]
    }
  ];

  getUsers(){
    return this.users;
  }

}
