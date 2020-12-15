import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../parametres/auth.service';
import { JWTTokenService } from '../parametres/jwt-helper.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JWTTokenService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',{ validators: [Validators.required], updateOn: "change" }],
      password: ['',{ validators: [Validators.required], updateOn: "change" }],
    });
  }

  get formControls(){
    return this.loginForm.controls;
  }

  message: string;
  hide = true;

  seConnecter(){
    // console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.formControls.username.value,this.formControls.password.value).subscribe(
      data => {
        console.log('token: '+data.token)
        this.jwtService.setToken(data.token)
        console.log('token expiré ?: '+this.jwtService.isTokenExpired())
        this.router.navigate(['accueil']);
      },
      error => {
        if (error.status === 401) {
          this.message = 'Username ou Password incorrect.'
        }
        console.log('message: '+error.error.message+' code: '+error.error.code)
        return
      }
    );
  }
}
