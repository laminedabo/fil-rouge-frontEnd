import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../Services/profil.service';


@Component({
  selector: 'app-liste-profil',
  templateUrl: './liste-profil.component.html',
  styleUrls: ['./liste-profil.component.css']
})
export class ListeProfilComponent implements OnInit {

  constructor(private profilService: ProfilService) { }


  dataSource : any[];

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(
      data => {
        this.dataSource = data
      }
    );
  }

  tableColumns  :  string[] = ['ID', 'libelle','actions'];
  
}
