import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayorMenorComponent } from './mayormenor.component';
import { MayorMenorRoutingModule } from './mayormenor-routing.module';


@NgModule({
  declarations: [
    MayorMenorComponent,
  ],
  imports: [
    CommonModule,
    MayorMenorRoutingModule,

  ]
})
export class MayorMenorModule { }
