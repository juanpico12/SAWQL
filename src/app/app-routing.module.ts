import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
// import { SignInComponent } from '../../components/sign-in/sign-in.component';
// import { SignUpComponent } from '../../components/sign-up/sign-up.component';
// import { DashboardComponent } from '../../components/dashboard/dashboard.component';
// import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

const routes: Routes = [
  {
     path: '',
     redirectTo: 'login',
     pathMatch: 'full',
  },
  {
     path: 'login',
     loadChildren: () => import('./modules/login/login.module').then((mod) => mod.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
