import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';

const routes: Routes = [
   {
      path: '',
      component: BaseLayoutComponent,
      // Protect all other child routes at one time instead of adding the AuthGuard to each route individually.
      // canActivateChild: [AuthGuard],
      children: [
         //Default component (similar Home)
         {
            path: '',
            // Una vez validado el home, debe rederigir a /app/principal.
            redirectTo: 'principal',
            // loadChildren: () =>
            //    import('./../../modules/cases/cases.module').then((mod) => mod.CasesModule),
            // canActivate: [RoleGuard],
         },
         {
            path: 'principal',
            loadChildren: () =>
               import('./../../modules/home/home.module').then((mod) => mod.HomeModule),
            // canActivate: [RoleGuard],
         },
         {
            path: 'sim',
            loadChildren: () =>
               import('./../../modules/sim/sim.module').then((mod) => mod.SimModule),
            // canActivate: [RoleGuard],
         },
         {
            path: 'experimentos',
            loadChildren: () =>
               import('./../../modules/experiments/experiments.module').then((mod) => mod.ExperimentsModule),
            // canActivate: [RoleGuard],
         },
      ],
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class BaseLayoutRoutingModule { }
