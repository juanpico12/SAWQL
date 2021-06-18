import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExperimentsComponent],
  imports: [
    CommonModule,
    ExperimentsRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ExperimentsModule { }
