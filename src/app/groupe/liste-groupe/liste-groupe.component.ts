import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-groupe',
  templateUrl: './liste-groupe.component.html',
  styleUrls: ['./liste-groupe.component.css']
})
export class ListeGroupeComponent implements OnInit {

  constructor() { }

  groupes = [
    {
      "id":1,
      "libelle":'Groupe Principal'
    },
    {
      "id":2,
      "libelle":'Groupe 2'
    },
    {
      "id":1,
      "libelle":'Groupe 3'
    }
  ]

  ngOnInit(): void {
  }

}
