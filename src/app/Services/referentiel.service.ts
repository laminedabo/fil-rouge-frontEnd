import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private authService: AuthService) { }

  getReferentiels(){
    return this.authService.get('/api/admin/referentiels');
  }

  getReferentiel(id: number){
    return this.authService.get('/api/admin/referentiels/'+id);
  }

  addReferentiel(referentiel:any){
    return this.authService.post('/api/admin/referentiels',referentiel);
  }

  updateReferentiel(referentiel:any, id:number){
    return this.authService.post('/api/admin/referentiels/'+id,referentiel);
  }
  
}
