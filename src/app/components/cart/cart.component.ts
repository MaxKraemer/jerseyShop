import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ProductsService} from "../../service/products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  jerseys: any[] = [];

  constructor(public cartService: CartService, public productService: ProductsService, 
    public angularFirestore: AngularFirestore) {
  }

  ngOnInit(): void {
   this.angularFirestore.collection('cart').get().subscribe((data: any) => {
    this.jerseys = data;
    console.log('this.jerseys', this.jerseys);
    
    });
  }
}
