import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   {

  registerUser: FormGroup;
  firebaseErrorMessage: string;

  constructor( public fireAuth: AngularFireAuth,
               public auth: AuthService,
               private router: Router,
               public dialog: MatDialogModule,
               public matDialog: MatDialog) {

    this.registerUser = new FormGroup({
      firstName: new FormControl('', [  ]),
      lastName: new FormControl('', [  ]),
      email: new FormControl('', [  ]),
      password: new FormControl('', [  ]),
    });
    this.firebaseErrorMessage = '';
  }

  ngOnInit() {

  }

  dialogClose() {
    this.matDialog.closeAll();
  };

  signUp() {
    console.log(this.registerUser.value);
    if (this.registerUser.invalid)
      return;
    this.auth.signupUser(this.registerUser.value).then((result) => {
      if (result == null) {                               // null is success, false means there was an error
        console.log('logging in...');
        this.router.navigate(['userDashboard']);                // when the user is logged in, navigate them to dashboard
      } else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
      }).catch(() => {
      });
      this.dialogClose();
    }
  }

