import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {

    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.userLoggedIn = true;

      } else {
        this.userLoggedIn = false;
        
      }
    });
  }

  public loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Auth Service: loginUser: success', res.user?.multiFactor);
        this.router.navigate(['myDashboard']);
      })
      .catch();
  }

  public userData(): any {
    return this.afAuth.user;
  }

  public signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        result.user?.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        })
        let emailLower = user.email.toLowerCase();
        result.user?.sendEmailVerification()
        this.router.navigate(['myDashboard']);
      })
      .catch();
  }

  public logoutUser(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

}
