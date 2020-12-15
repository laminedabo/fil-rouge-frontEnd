import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProfilService } from './../../Services/profil.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(private profilService: ProfilService ,public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }

    profils: any

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(
      data => {
        this.profils = data
      }
    ) 
  }

  close() {
    this.dialogRef.close("sucess");
  }

  save(){
    this.dialogRef.close("save");
  }

}
