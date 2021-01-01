import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupeCompetenceService {

  constructor(private authService: AuthService) { }

  getGroupecompetences(){
    return this.authService.get('/api/admin/groupecompetences');
  }

  getGroupecompetence(id: number){
    return this.authService.get('/api/admin/groupecompetences/'+id);
  }

  addGroupecompetence(groupecompetence:any){
    return this.authService.post('/api/admin/groupecompetences',groupecompetence);
  }

  updateGroupecompetence(groupecompetence:any, id:number){
    return this.authService.post('/api/admin/groupecompetences/'+id,groupecompetence);
  }
}
