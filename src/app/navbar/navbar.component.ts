import { Component } from '@angular/core';
import { MatDialogModule} from "@angular/material/dialog";
import { FormsModule} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {CartService} from "../service/cart.service";
import {AuthService} from "../service/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



constructor(public dialog: MatDialogModule, public matDialog: MatDialog, public cart: CartService, public auth: AuthService) {}

  public get userLoggedIn() {
    return this.auth.userLoggedIn;
  }

  openDialog() {
   this.matDialog.open(RegisterComponent);
  }

  openLoginDialog() {
    this.matDialog.open(LoginComponent);
  }

  logout() {
    this.auth.logoutUser();
  }

}
