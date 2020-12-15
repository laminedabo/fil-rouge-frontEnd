import { ProfilService } from './../../Services/profil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/Services/user.service';
import { FileValidator } from 'ngx-material-file-input';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private profilService: ProfilService) { }

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
        this.registerForm.reset();
      },
      err => {
        console.log('error:  ')
        console.log(err)
      }
    );
  }
}
