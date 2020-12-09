import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})

export class ListeUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users = this.userService.getUsers();

  ngOnInit(): void {
  }

  dataSource = this.users;
  tableColumns  :  string[] = ['ID', 'nom','prenom','email','profil','actions'];

}
