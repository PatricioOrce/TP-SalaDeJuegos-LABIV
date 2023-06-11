import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    PreguntadosRoutingModule,
    HttpClientModule 
  ]
})
export class PreguntadosModule { }
