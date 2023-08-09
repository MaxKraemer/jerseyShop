import {Component, OnInit} from '@angular/core';
import { MatDialogModule} from "@angular/material/dialog";
import { FormsModule} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {CartService} from "../../service/cart.service";
import {AuthService} from "../../service/auth.service";
import firebase from "firebase/compat";
import {AngularFireAuth} from "@angular/fire/compat/auth";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

public user: firebase.User | null | undefined;


constructor(public dialog: MatDialogModule, public matDialog: MatDialog, public cart: CartService, public auth: AuthService, private afAuth: AngularFireAuth)  {
  afAuth.authState.subscribe(user => this.user = user);
}

  ngOnInit(): void {

  }

  public get userLoggedIn() {
    return this.auth.userLoggedIn;
  }

  public openDialog() {
   this.matDialog.open(RegisterComponent);
  }

  public openLoginDialog() {
    this.matDialog.open(LoginComponent);
  }

  public logout() {
    this.auth.logoutUser();
    this.cart.clearCart();
  }

}
