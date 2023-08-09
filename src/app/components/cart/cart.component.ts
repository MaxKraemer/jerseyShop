import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ProductsService} from "../../service/products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public productSubscription: Subscription | undefined;
  jersey: any;

  constructor(public cartService: CartService, public productService: ProductsService, 
    public angularFirestore: AngularFirestore, public firestore: Firestore) {
  }

  ngOnInit(): void {
    this.productSubscription = this.cartService.product$.subscribe((product) => {
      this.jersey = product;
      console.log('product', product);
    });
  }
}
