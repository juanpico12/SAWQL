import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/erlenmeyer.json',
  };
  form: FormGroup;
  public readonly EMAIL = 'email';
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form =this.createForgotPwForm();
  }
  animationCreated(animationItem: AnimationItem): void {
  }

  createForgotPwForm(){
    return this.formBuilder.group({
      [this.EMAIL]: ['', [CustomValidators.required('Email requerido')]],
   });
  }

  onForgotPw(){
    this.authService.ForgotPassword(this.form.get('email').value)
  }
}
