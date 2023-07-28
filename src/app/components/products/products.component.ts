import { Component } from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {CartService} from "../../service/cart.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(public products: ProductsService, public cart: CartService, private route: ActivatedRoute) {}

  public addToCart(jerseys: any) {
    console.log('addToCart', jerseys);
    this.cart.addToCart(jerseys);
    this.cart.getBadgeCount();
  }

}
