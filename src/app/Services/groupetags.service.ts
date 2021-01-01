import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupetagsService {

  constructor(private authService: AuthService) { }

  getGroupetags(){
    return this.authService.get('/api/admin/groupetags');
  }

  getGroupetag(id: number){
    return this.authService.get('/api/admin/groupetags/'+id);
  }

  addGroupetag(groupetag:any){
    return this.authService.post('/api/admin/groupetags',groupetag);
  }

  updateGroupetag(groupetag:any, id:number){
    return this.authService.post('/api/admin/groupetags/'+id,groupetag);
  }
}
