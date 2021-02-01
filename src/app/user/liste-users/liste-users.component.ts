import { ProfilService } from './../../Services/profil.service';
import { ProfilDetailsComponent } from './../../profil/profil-details/profil-details.component';
import { User } from './../../Entity/User';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

@Injectable({
  providedIn: 'root'
})
export class ListeUsersComponent implements OnInit {

  constructor(
    private userService: UserService, private matDialog: MatDialog, 
    private authService: AuthService, private profilDetail: ProfilDetailsComponent,
    private profilService: ProfilService,
    private _snackBar: MatSnackBar
    ) { }

  title = 'Liste des Utilisateurs';
  dataSource : any[];

  myPageEvent: PageEvent;
  myPageIndex = 1;
  myPageSize:10;
  myLength:number;

  searchValue = '';
  search(term: any){
    if (term.target.value.length==0) {
      return
    }
    this.userService.search(term.target.value).subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  profilId = null;
  ngOnInit(): void {
    if (this.profilDetail.id) {
      this.profilId = this.profilDetail.id;
      this.getTotalMembers(this.profilDetail.id);
      this.listeDetailsProfil(this.profilDetail.id);
    }
    else{
      this.userService.getUsers(1).subscribe(
        data => {
          this.dataSource = data
        }
      );
      this.getTotalMembers(0)
    }
    
  }

  getTotalMembers(i?: number){
    this.userService.getCount(i).subscribe(
      data => {
        this.myLength = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  public getServerData(event?:PageEvent){
    this.myPageIndex = event.pageIndex  + 1;
    this.userService.getUsers(this.myPageIndex).subscribe(
      data => {
        this.dataSource = data
      }
    );
  }

  tableColumns  :  string[] = ['avatar', 'nom','prenom','email','profil','actions'];

  dialogConfig = new MatDialogConfig();
  openDetails(user:User) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.height = '65%';
    this.dialogConfig.width = '50%';
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
            this.userService.getUsers(this.myPageIndex).subscribe(
              data => {
                this.dataSource = data
                this.openSnackBar("Vous avez bloqué cet utilisateur", "Okey");               
              }
            );
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
    this.dialogConfig.height = '90%';
    this.dialogConfig.width = '60%'
    this.dialogConfig.data = {
      "title":"Edit User",
      "user":user,
      "action":"edit"
    };
    const dialogRef = this.matDialog.open(UserDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      if(value=='save'){
        this.userService.getUsers(this.myPageIndex).subscribe(
          data => {
            this.dataSource = data
          }
        );
      }
      
      console.log(`Dialog sent: ${value}`); 
    });
  }

  updateTable(event:any){
    if (event=='userCreated') {
      this.userService.getUsers(Math.round(this.myLength/10)).subscribe(
        data => {
          this.dataSource = data
        }
      );
    }
  }

  listeDetailsProfil(id: number){
    this.title=`${this.title} du Profil`;
    this.profilService.getProfilUsers(id).subscribe(
      data => {
        this.dataSource = data;
        this.myLength = data.length;
      },
      error => {
        console.log(error);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}