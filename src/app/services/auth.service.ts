import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  [x: string]: any;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  isLoggedIn: boolean =false;

  updateLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }

  ngOnInit(): void {}
  SignIn(email: string, password: string) {
    console.log("asd");
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        localStorage.setItem('loggedAccount', email);

        this.isLoggedIn = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged In Succesfully',
          showConfirmButton: false,
          timer: 1500
        })
        if (res.user?.emailVerified == true) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );

  }

  // SignUp(email: any, password: any, isAdmin =false) {
  //   return this.fireauth.createUserWithEmailAndPassword(email, password)
  //     .then((result: any) => {
  //       /* Call the SendVerificaitonMail() function when new user sign
  //       up and returns promise */
  //       this.SetUserData(result.user, 'creation', isAdmin);
  //       alert('Account creation succeed')
  //       this.router.navigate(['']);
  //     })
  // }
  SignUp(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successful');
        // this['sendEmailForVarification'](res.user);
        this.SignIn(email,password);
        // this.router.navigate(['/login']);
      }
    );
  }

  SignOut() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedAccount');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  SetUserData(user: any, eventType: string, isAdmin =false) {
    const userData: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAdmin
    }
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    localStorage.setItem('user', JSON.stringify(userData));
  }
}
