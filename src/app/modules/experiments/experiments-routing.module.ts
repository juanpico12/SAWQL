import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperimentsComponent } from './components/experiments/experiments.component';


const routes: Routes = [
   {
      path: '',
      component: ExperimentsComponent,
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class ExperimentsRoutingModule {}
