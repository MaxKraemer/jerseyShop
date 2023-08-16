import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public user: any;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.userData().subscribe((user: any) => {
      console.log(user,'user');
      this.user = user;
    });
  }

}
