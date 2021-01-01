import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-profil-sortie',
  templateUrl: './liste-profil-sortie.component.html',
  styleUrls: ['./liste-profil-sortie.component.css']
})
export class ListeProfilSortieComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  profilsorties: any;
  link="profilsorties"

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.profilsorties = data.profilsorties
      },
      error => {
        console.log(error)
      }
    )
  }

}
