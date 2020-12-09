import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../Services/profil.service';


@Component({
  selector: 'app-liste-profil',
  templateUrl: './liste-profil.component.html',
  styleUrls: ['./liste-profil.component.css']
})
export class ListeProfilComponent implements OnInit {

  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {
  }
  
  profils = this.profilService.getProfils();

  dataSource = this.profils;
  tableColumns  :  string[] = ['ID', 'libelle','actions'];
  
}
