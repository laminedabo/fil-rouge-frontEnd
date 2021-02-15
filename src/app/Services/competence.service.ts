import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private authService: AuthService) { }

  getCompetences(){
    return this.authService.get('/api/admin/competences');
  }

  getCompetence(id: number){
    return this.authService.get('/api/admin/competences/'+id);
  }

  addCompetence(competence:any){
    return this.authService.post('/api/admin/competences',competence);
  }

  updateCompetence(competence:any, id:number){
    return this.authService.patch('/api/admin/competences/'+id,competence);
  }
}
