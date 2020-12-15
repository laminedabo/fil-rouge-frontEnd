import { User } from './../../Entity/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { PageEvent } from "@angular/material/paginator";
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { DialogComponent } from 'src/app/public/dialog/dialog.component';
import { AuthService } from 'src/app/parametres/auth.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})

export class ListeUsersComponent implements OnInit {

  constructor(private userService: UserService, private matDialog: MatDialog, private authService: AuthService) { }

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

  dialogConfig = new MatDialogConfig();
  openDetails(user:User) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.height = '65%';
    this.dialogConfig.width = '50%'
    this.dialogConfig.data = {
      "title":"Details Utilisateur",
      "user":user,
    };
    const dialogRef = this.matDialog.open(UserDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

  openDelete(user:User){
    this.dialogConfig.height = '26%';
    this.dialogConfig.width = '30%'
    this.dialogConfig.data = {
      "title":"Blocage Utilisateur",
      "message":`Vous bloquez l'utilisateur ${user.prenom} ${user.nom} de profil ${user.profil.libelle} ?`
    };
    const dialogRef = this.matDialog.open(DialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result=='confirmation'){
        this.authService.delete('/api/admin/users/'+user.id).subscribe(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    });
  }

  openEdit(user: User){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.height = '65%';
    this.dialogConfig.width = '50%'
    this.dialogConfig.data = {
      "title":"Edit User",
      "user":user,
      "action":"edit"
    };
    const dialogRef = this.matDialog.open(UserDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }
  
}