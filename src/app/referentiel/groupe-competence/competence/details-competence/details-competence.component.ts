import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-competence',
  templateUrl: './details-competence.component.html',
  styleUrls: ['./details-competence.component.css']
})
export class DetailsCompetenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.niveauClicked(this.niveaux[0])
  }

  niveaux = [
    {
      "id":1,
      "libelle":"Niveau 1",
      "grpAction": "Dolor sit amet consectetur. Lorem ipsum adipisicing elit. Assumenda, exercitationem. Lorem ipsum.",
      "critereEval":"Lorem ipsum consectetur dolor sit amet asctetur.sit amet."
    },
    {
      "id":2,
      "libelle":"Niveau 2",
      "grpAction":"Amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, exercitationem.",
      "critereEval":"Dolor sit amet asctetur. Lorem ipsum consectetur sit amet."
    },
    {
      "id":3,
      "libelle":"Niveau 3",
      "grpAction":"Lorem ipsum dolor sit. Assumenda, exercitationem. Amet consectetur adipisicing elit",
      "critereEval":"Adipisicing elit. Lorem ipsum consectetur asctetur"
    }
  ]

  grpAction: string;
  critereEval: string;
  idNiv: number
  niveauClicked(niveau:any){
    if(niveau){
    this.idNiv = niveau.id;
    this.critereEval = niveau.critereEval;
    this.grpAction = niveau.grpAction
    }
  }

}
