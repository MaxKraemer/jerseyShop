import { Component } from '@angular/core';
import {CartService} from "../service/cart.service";
import {ProductsService} from "../service/products.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  jerseys = this.cartService.getItems();

  constructor(public cartService: CartService, public productService: ProductsService) {
  }

}
