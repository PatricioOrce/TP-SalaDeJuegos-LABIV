import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  [x: string]: any;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  isLoggedIn: boolean =true;

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
  Register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successful');
        this['sendEmailForVarification'](res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);

        this.router.navigate(['/register']);
      }
    );
  }
  SignOut() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedAccount');

        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // forgotPassword(email: string) {
  //   this.fireauth.sendPasswordResetEmail(email).then(
  //     () => {
  //       this.router.navigate(['/verify-email']);
  //     },
  //     (err) => {
  //       window.alert('Something Went Wrong');
  //     }
  //   );
  // }
  // // email varification
  // sendEmailForVarification(user: any) {
  //   console.log(user);
  //   user.sendEmailVerification().then(
  //     (res: any) => {
  //       this.router.navigate(['/verify-email']);
  //     },
  //     (err: any) => {
  //       alert('Something went wrong. Not able to send mail to your email.');
  //     }
  //   );
  // }
}
