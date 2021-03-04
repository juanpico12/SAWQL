import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimComponent } from './components/sim/sim.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SimRoutingModule } from './sim-routing.module';
import { SimItemComponent } from './components/sim-item/sim-item.component';


@NgModule({
  declarations: [SimComponent, SimItemComponent],
  imports: [
    CommonModule,
    SimRoutingModule,
    MaterialModule
  ]
})
export class SimModule { }
