import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
@NgModule({
   declarations: [BaseLayoutComponent],
   imports: [CommonModule, BaseLayoutRoutingModule, MaterialModule, HttpClientModule,AvatarModule],
})
export class BaseLayoutModule { }
