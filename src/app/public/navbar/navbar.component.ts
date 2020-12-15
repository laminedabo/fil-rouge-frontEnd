import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../../parametres/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public matDialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
  }

  dialogConfig = new MatDialogConfig();
  openDialog(): void {
    this.dialogConfig.height = '20%';
    this.dialogConfig.width = '30%'
    this.dialogConfig.data = {
      "title":"Deconnexion",
      "message":`Vous êtes sûr.e vouloir vous deconnecter ?`
    };
    const dialogRef = this.matDialog.open(DialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result=='confirmation'){
        this.authService.disConnect()
      }
    });
  }

  isConnected = this.authService.isConnected()
  
}
