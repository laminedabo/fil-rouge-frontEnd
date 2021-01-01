import { CompetenceService } from './../Services/competence.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetenceResolver implements Resolve<any> {

  constructor(private competenceService: CompetenceService) { }

  resolve(){
    return this.competenceService.getCompetences()
  }
}
