import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-referentiel',
  templateUrl: './liste-referentiel.component.html',
  styleUrls: ['./liste-referentiel.component.css']
})
export class ListeReferentielComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  referentiels: any;
  link='referentiels'

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.referentiels = data.referentiels;
      },
      error => {
        console.log(error);
      }
    )
  }

}
