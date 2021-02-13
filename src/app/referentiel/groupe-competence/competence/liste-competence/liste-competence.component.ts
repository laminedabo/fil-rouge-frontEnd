import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-competence',
  templateUrl: './liste-competence.component.html',
  styleUrls: ['./liste-competence.component.css']
})
export class ListeCompetenceComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  competences: any
  link='competences'

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        data.competences.cmps.subscribe(
          (cmps:any) =>{
            this.competences = cmps
          }
        )
      },
      error => {
        console.log(error)
      }
    )
  }

}
