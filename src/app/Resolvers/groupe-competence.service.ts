import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { GroupeCompetenceService } from '../Services/groupe-competence.service'

@Injectable({
  providedIn: 'root'
})
export class GroupeCompetenceResolver implements Resolve<any> {

  constructor(private groupeCompetenceService: GroupeCompetenceService) { }

  resolve() {
    return this.groupeCompetenceService.getGroupecompetences();
  }
}
