import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../../parametres/auth.service'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  seDeconnecter(){
    this.authService.disConnect()
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
