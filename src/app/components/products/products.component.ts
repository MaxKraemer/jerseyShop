import { Component } from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {CartService} from "../../service/cart.service";
import {ActivatedRoute} from "@angular/router";
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  userId: any = localStorage.getItem('userId');

  constructor(public products: ProductsService, public cart: CartService, private route: ActivatedRoute) {}

  public addToCart(product: any) { 
     this.cart.addToCart(product);
     this.cart.getBadgeCount();
   }

}
