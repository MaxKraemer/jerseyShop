import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  constructor(public auth: AuthService) {}

  public user: any;

  ngOnInit(): void {
    this.auth.userData().subscribe((user: any) => {
      console.log(user,'user');
      this.user = user;
    });
  }

}
