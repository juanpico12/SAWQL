import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
//import { AuthGuard } from "../shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
