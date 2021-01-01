import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { GroupetagsService } from '../Services/groupetags.service';

@Injectable({
  providedIn: 'root'
})
export class GroupetagsResolver implements Resolve<any> {

  constructor(private groupetagsservice: GroupetagsService) { }
  resolve(){
    return this.groupetagsservice.getGroupetags()
  }
}
