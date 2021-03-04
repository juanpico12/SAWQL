import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthGuardUnlogged } from './core/guards/authUnlogged.guard';
// Import all the components for which navigation service has to be activated 
// import { SignInComponent } from '../../components/sign-in/sign-in.component';
// import { SignUpComponent } from '../../components/sign-up/sign-up.component';
// import { DashboardComponent } from '../../components/dashboard/dashboard.component';
// import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

const routes: Routes = [
  // {
  //    path: '',
  //    redirectTo: 'login',
  //    pathMatch: 'full',
  // },
  // {
  //    path: 'login',
  //    loadChildren: () => import('./modules/login/login.module').then((mod) => mod.LoginModule),
  // },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
 },
 {
    path: 'login',
    canLoad: [AuthGuardUnlogged],
    loadChildren: () => import('./modules/login/login.module').then((mod) => mod.LoginModule),
 },
 {
    path: 'app',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
       import('./modules/base-layout/base-layout.module').then((mod) => mod.BaseLayoutModule),
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
