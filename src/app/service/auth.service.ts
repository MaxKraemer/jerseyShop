import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {

    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.router.navigate(['userDashboard']);
      })
      .catch();
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user?.sendEmailVerification()
      })
      .catch();
  }

  logoutUser(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

}
