import { Resolve } from '@angular/router';
import { ProfilsortieService } from './../Services/profilsortie.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilsortieResolver implements Resolve<any> {

  constructor(private profilsortieService: ProfilsortieService) { }

  resolve(){
    return this.profilsortieService.getProfilsorties()
  }
}
