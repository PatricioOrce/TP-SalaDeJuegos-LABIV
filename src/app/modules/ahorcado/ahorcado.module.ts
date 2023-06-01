import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado.component';
import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { FormModule } from '../form/form.module';
// import { TablaPuntuacionModule } from '../tabla-puntuacion/tabla-puntuacion.module';

@NgModule({
  declarations: [
    AhorcadoComponent,
  ],
  imports: [
    AhorcadoRoutingModule,
    CommonModule,
    HttpClientModule,
  ]
})
export class AhorcadoModule { }
