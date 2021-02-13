import { Observable } from 'rxjs';
import { CompetenceService } from './../Services/competence.service';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetenceResolver implements Resolve<any> {

  constructor(private competenceService: CompetenceService, private route: ActivatedRoute) { }

  resolve():Observable<any>{
    const cmp = this.competenceService.getCompetence(2);//not functionnal
    const cmps = this.competenceService.getCompetences();
    const competnce = {cmp: cmp, cmps: cmps};
    return competnce as unknown as Observable<any>
  }
}
