import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authService: AuthService
  constructor(private auth: AuthService) {
    this.authService = auth;
  }
  loggedUser: string | undefined  = this.auth.usuario?.email+(this.auth.usuario?.isAdmin ? "(Admin)" : '');
  ngOnInit(): void {
  }

}