import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'quienSoy', component: QuienSoyComponent },
  { path: 'ahorcado', loadChildren: () => import('./modules/ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
  { path: 'mayormenor', loadChildren: () => import('./modules/mayormenor/mayormenor.module').then(m => m.MayormenorModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }