import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competence-niveau',
  templateUrl: './competence-niveau.component.html',
  styleUrls: ['./competence-niveau.component.css']
})
export class CompetenceNiveauComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.cmptenceClicked(this.competences[0])
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

  niveaux2 = [
    {
      "id":1,
      "libelle":"Niveau 1",
      "grpAction": "Lorem ipsum adipisicing elit. Dolor sit amet consectetur. Derraizio, exampliasione. Gariz Opsum.",
      "critereEval":"Consectetur dolor sit amet. Lorem ipsum consectetur dolor sit amet asctetur.sit amet."
    },
    {
      "id":2,
      "libelle":"Niveau 2",
      "grpAction":"Adipisicing elit. Assumenda, exercitationem. Amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur",
      "critereEval":"Lorem ipsum consectetur. Dolor sit amet asctetur.  Saler sit amet."
    },
    {
      "id":3,
      "libelle":"Niveau 3",
      "grpAction":"Amet consectetur adipisicing. Lorem ipsum dolor sit. Assumenda, exercitationem.Derl elit",
      "critereEval":"Adipisicing elit. Lorem ipsum consectetur asctetur"
    }
  ]

  @Input() competences = [
    {
      id:1,
      "libelle": "Maquetter une application",
      "niveaux": this.niveaux
    },
    {
      id:2,
      "libelle": "Réaliser une modélisation complète",
      "niveaux": this.niveaux2
    },
    {
      id:3,
      "libelle": "Configuer une base de données",
      "niveaux": this.niveaux
    },
    {
      id:4,
      "libelle": "Publier un site en ligne",
      "niveaux": this.niveaux2
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

  idCmp: number
  cmptenceClicked(cmp:any){
    this.idCmp = cmp.id;
    this.niveauClicked(cmp.niveaux[0])
  }

}
