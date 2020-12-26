import { ReferentielService } from './../../Services/referentiel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-referentiel',
  templateUrl: './liste-referentiel.component.html',
  styleUrls: ['./liste-referentiel.component.css']
})
export class ListeReferentielComponent implements OnInit {

  constructor(private referentielService: ReferentielService) { }

  referentiels: any;

  ngOnInit(): void {
    this.referentielService.getReferentiels().subscribe(
      ref => {
        this.referentiels = ref;
        console.log(ref)
      },
      error => {
        console.log(error)
      }
    )
  }

}
