import { ReferentielService } from './../../Services/referentiel.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-referentiel',
  templateUrl: './details-referentiel.component.html',
  styleUrls: ['./details-referentiel.component.css']
})
export class DetailsReferentielComponent implements OnInit {

  constructor(private route: ActivatedRoute, private referentielService: ReferentielService) { }
  referentiel: any;
  groupecomp: any;
  comp: any;
  niveaux: any;

  color='primary'

  ngOnInit(): void {
    this.referentielService.getReferentiel(this.route.snapshot.params['id']).subscribe(
      data => {
        this.referentiel = data;
        this.groupecomp = this.referentiel.groupecompetence;
        this.comp = this.groupecomp[0].competence;
        this.niveaux = this.comp[0].niveau;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }

}
