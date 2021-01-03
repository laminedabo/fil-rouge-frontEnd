import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-liste-apprenant',
  templateUrl: './liste-apprenant.component.html',
  styleUrls: ['./liste-apprenant.component.css']
})
export class ListeApprenantComponent implements OnInit {

  apprenants: any[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getApprenants().subscribe(
      data => {
        this.apprenants = data;
        this.apprClicked(this.apprenants[0])
      },
      error => {
        console.log(error)
      }
    )
  }

  idAppr: number
  apprClicked(appr:any){
    this.idAppr = appr.id;
  }

}
