import { Observable } from 'rxjs';
import { ReferentielService } from './../Services/referentiel.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReferentielResolver implements Resolve<any>{

  constructor(private refServices: ReferentielService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.refServices.getReferentiels();
  }
}
