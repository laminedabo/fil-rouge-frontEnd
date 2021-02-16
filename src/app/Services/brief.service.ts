import { AuthService } from './../parametres/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BriefService {

  constructor(private authService: AuthService) { }

  getBriefs(){
    return this.authService.get(`/api/formateur/briefs`)
  }
}
