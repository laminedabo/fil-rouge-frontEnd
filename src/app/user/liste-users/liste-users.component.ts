import { User } from './../../Entity/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import {PageEvent} from "@angular/material/paginator";
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})

export class ListeUsersComponent implements OnInit {

  constructor(private userService: UserService, private matDialog: MatDialog) { }

  dataSource : any[];

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  length:number;

  ngOnInit(): void {
    this.userService.getUsers(1).subscribe(
      data => {
        this.dataSource = data
      }
    );
  }

  public getServerData(event?:PageEvent){
    console.log(event)
    this.userService.getUsers(event.pageIndex+1).subscribe(
      data => {
        console.log(data)
        this.dataSource = data
      }
    );
    return event;
  }

  tableColumns  :  string[] = ['avatar', 'nom','prenom','email','profil','actions'];

  openDialog(user:User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = '60%';
    dialogConfig.width = '50%'
    dialogConfig.data = {
      "title":"Details Utilisateur",
      "user":user
    };
    const dialogRef = this.matDialog.open(UserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }
  
}