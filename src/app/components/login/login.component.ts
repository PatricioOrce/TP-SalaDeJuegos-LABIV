import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  authService!: AuthService;

  constructor(private auth: AuthService) {
    this.authService = auth
  }

  ngOnInit(): void {
  }

  accesoRapido() {
    this.password = "test@test.com";
    this.email = "test@test.com";
  }

  loggedIn() {
    this.email && this.password &&
    this.authService?.SignIn(this.email, this.password)
  }
}