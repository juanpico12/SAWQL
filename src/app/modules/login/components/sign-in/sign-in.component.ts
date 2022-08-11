import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { GeneralService } from 'src/app/core/services/general.service';
import {MatDialog} from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  public readonly EMAIL = 'email';
  public readonly PASSWORD = 'password';
  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/atom.json',
  };
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public generalService: GeneralService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.createLoginForm();
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  onClickGoogleLogIn(){
    this.authService.GoogleAuth()
  }

  onLogin(){
    // console.log(this.form.get('email').value);
    // console.log(this.form.get('password').value);

    this.authService.SignIn(this.form.get('email').value,this.form.get('password').value).then(e => console.log(this.authService.GetUserData()))
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
       [this.EMAIL]: ['', [CustomValidators.required('Nombre de usuario requerido')]],
       [this.PASSWORD]: ['', [CustomValidators.required('Contraseña requerida')]],
    });
  }

  openDialog(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dialog.open(SignUpComponent, {
      height: '450px',
      width: '600px',
    });
    e.stopPropagation();
    e.preventDefault();
  }

}
