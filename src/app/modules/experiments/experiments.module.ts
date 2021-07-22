import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [ExperimentsComponent],
  imports: [
    CommonModule,
    ExperimentsRoutingModule,
    MaterialModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class ExperimentsModule { }
