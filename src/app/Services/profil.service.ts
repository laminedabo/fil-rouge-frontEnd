import { Injectable } from '@angular/core';
import { Profil } from '../Entity/Profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  profils: Profil[] = [
    {
      id:1,
      libelle: "ADMIN",
      users: null
    },{
      id:2,
      libelle: "CM",
      users: null
    },{
      id:3,
      libelle: "FORMATEUR",
      users: null
    },{
      id:4,
      libelle: "APPRENANT",
      users: null
    },
  ];

  getProfils(){
    return this.profils;
  }

  constructor() { }
}
