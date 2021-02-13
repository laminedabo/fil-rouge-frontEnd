import { ProfilService } from './../../Services/profil.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/Services/user.service';
import { FileValidator } from 'ngx-material-file-input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private profilService: ProfilService,
    private _snackBar: MatSnackBar
    ) { }

  registerForm: FormGroup;
  profils: any;
  /**
   * In this example, it's 1 MB (=1 * 2 ** 20).
   */
  readonly maxSize = 1048576;
 
  ngOnInit(): void {
    this.profilService.getProfils().subscribe(
      (data: any[]) => {
        this.profils = data.filter(
          (profil: any) => {
            return profil.libelle !=='APPRENANT'
          }
        )
      }
    )  
    this.registerForm = this.formBuilder.group({
      nom: ['',{ validators: [Validators.required], updateOn: "change" }],
      prenom: ['',{ validators: [Validators.required], updateOn: "change" }],
      email: ['',{validators: [Validators.required, Validators.email],updateOn: "change",}],
      profil_id: ['', { validators: [Validators.required], updateOn: 'change' }],
      avatar: [undefined, { validators: [FileValidator.maxContentSize(this.maxSize)], updateOn: 'change' }],
      // requiredfile: [undefined,[FileValidator.maxContentSize(this.maxSize)]]
    });
  }

  get formControls(){
    return this.registerForm.controls;
  }

  imgChange(event: Event){
    this.getBase64(this.registerForm.value.avatar.files[0]);
  }

  submit(){
    if (this.registerForm.invalid) {
      return;
    }
    const user = this.registerForm.value
    const formData = new FormData();
    formData.append('nom',user.nom);
    formData.append('prenom',user.prenom);
    formData.append('email',user.email);
    formData.append('profil_id',user.profil_id);
    formData.append('avatar',user.avatar.files[0])
    this.userService.addUser(formData).subscribe(
      data => {
        console.log('result:  ');
        console.log(data);
        this.sendEvent();
        this.registerForm.reset();
        this.avatar = '';
        this.openSnackBar("Utilisateur ajouté avec succès", "Okey");
      },
      err => {
        console.log('error:  ')
        console.log(err)
      }
    );
  }

  @Output() userIsCreated = new EventEmitter();
  sendEvent(){
    this.userIsCreated.emit(`userCreated`);
  }

  avatar:any;

  getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatar = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
