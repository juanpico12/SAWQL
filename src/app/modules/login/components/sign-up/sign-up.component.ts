import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  public readonly EMAIL = 'email';
  public readonly PASSWORD = 'password';
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form =this.createSignUpForm();
  }

  onClickGoogleLogIn(){
    this.authService.GoogleAuth()
  }

  onSignUp(){
    console.log(this.form.get('email').value);
    console.log(this.form.get('password').value);
    
    this.authService.SignUp(this.form.get('email').value,this.form.get('password').value)
  }

  createSignUpForm(): FormGroup {
    return this.formBuilder.group({
       [this.EMAIL]: ['', [CustomValidators.required('Nombre de usuario requerido')]],
       [this.PASSWORD]: ['', [CustomValidators.required('Contraseña requerida')]],
    });
  }



}
