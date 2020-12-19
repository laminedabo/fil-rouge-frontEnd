import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileValidator } from 'ngx-material-file-input';
import { UserService } from 'src/app/Services/user.service';
import { ProfilService } from './../../Services/profil.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(private userService: UserService, 
    private formBuilder: FormBuilder,
    private profilService: ProfilService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log(data)
    }

    registerForm: FormGroup;
    profils: any;
    /**
     * In this example, it's 1 MB (=1 * 2 ** 20).
     */
    readonly maxSize = 1048576;

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(
      data => {
        this.profils = data
      }
    );
    
    this.registerForm = this.formBuilder.group({
      nom: [this.data.user.nom,{ validators: [Validators.required], updateOn: "change" }],
      prenom: [this.data.user.prenom,{ validators: [Validators.required], updateOn: "change" }],
      username: [this.data.user.username,{ validators: [Validators.required], updateOn: "change" }],
      email: [this.data.user.email,{validators: [Validators.required, Validators.email],updateOn: "change",}],
      adresse: [this.data.user.adresse,{ validators: [Validators.required], updateOn: "change" }],
      profil_id: [this.data.user.profil.id, { validators: [Validators.required], updateOn: 'change' }],
      avatar: [undefined, { validators: [FileValidator.maxContentSize(this.maxSize)], updateOn: 'change' }],
    });
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submit(){
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value)
    const user = this.registerForm.value
    const formData = new FormData();
    formData.append('nom',user.nom);
    formData.append('prenom',user.prenom);
    formData.append('email',user.email);
    formData.append('adresse',user.adresse);
    formData.append('username',user.username);
    formData.append('profil_id',user.profil_id);
    if (user.avatar!=null) {
      formData.append('avatar',user.avatar.files[0])
    }
    this.userService.updateUser(formData,this.data.user.id).subscribe(
      data => {
        console.log('result:  ');
        // console.log(data);
        this.registerForm.reset();
      },
      err => {
        console.log('error:  ')
        console.log(err)
      }
    );
    this.dialogRef.close("save");
  }

  close() {
    this.dialogRef.close("closed");
  }
}
