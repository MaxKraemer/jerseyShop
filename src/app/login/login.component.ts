import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private auth: AuthService, private router: Router, private afAuth: AngularFireAuth, public dialog: MatDialogModule,
              public matDialog: MatDialog) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    if (this.loginForm.valid){
      this.router.navigate(['/dashboard']);
    }
  }

  dialogClose() {
    this.matDialog.closeAll();
  };

  loginUser() {
    if (this.loginForm.invalid)
      return;

    this.auth.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {
        this.router.navigate(['/dashboard']);
      }
      else if (result.isValid == false) {
        this.firebaseErrorMessage = result.message;
      }
    });
    this.matDialog.closeAll();
  }


}
