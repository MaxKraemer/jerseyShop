import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AuthService} from "../../service/auth.service";
import { CartService } from '../../service/cart.service';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  constructor(public auth: AuthService, public cartService: CartService, public productService: ProductsService, public angularFirestore: AngularFirestore) {}

  public user: any;
  jerseys: any[] = [];

  ngOnInit(): void {
    this.auth.userData().subscribe((user: any) => {
      console.log(user,'user');
      this.user = user;
    });
    this.jerseyItems();
  }

  public jerseyItems(): void {
    this.cartService.getItems();
    this.jerseys = this.cartService.jerseys;
  }

}
