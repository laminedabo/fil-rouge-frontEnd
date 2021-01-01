import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-groupe-competence',
  templateUrl: './liste-groupe-competence.component.html',
  styleUrls: ['./liste-groupe-competence.component.css']
})
export class ListeGroupeCompetenceComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  grpcomptences: any;
  link='groupecompetences'

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.grpcomptences = data.groupecompetences
      },
      error => {
        console.log(error)
      }
    )
  }

}
