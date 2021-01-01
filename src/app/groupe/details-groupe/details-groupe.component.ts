import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-details-groupe',
  templateUrl: './details-groupe.component.html',
  styleUrls: ['./details-groupe.component.css']
})
export class DetailsGroupeComponent implements OnInit {

  constructor(private userService: UserService) { }

  apprenants:any 

  ngOnInit(): void {
    this.userService.getApprenants().subscribe(
      data => {
        this.apprenants = data;
      },
      error => {
        console.log(error)
      }
    )
  }

}
