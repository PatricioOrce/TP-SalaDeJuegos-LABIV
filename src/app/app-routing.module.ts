import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: MenuPrincipalComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'quienSoy', component: QuienSoyComponent },
  { path: 'ahorcado', loadChildren: () => import('./modules/ahorcado/ahorcado.module').then(m => m.AhorcadoModule), canActivate:[LoggedInGuard] },
  { path: 'mayormenor', loadChildren: () => import('./modules/mayormenor/mayormenor.module').then(m => m.MayorMenorModule), canActivate:[LoggedInGuard] },
  { path: 'preguntados', loadChildren: () => import('./modules/preguntados/preguntados.module').then(m => m.PreguntadosModule), canActivate:[LoggedInGuard] },
  { path: 'snake', loadChildren: () => import('./modules/snake/snake.module').then(m => m.SnakeModule),canActivate:[LoggedInGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }