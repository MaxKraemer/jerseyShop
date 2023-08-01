import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ProductsService} from "../../service/products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { AppStateService } from 'src/app/service/app-state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  jerseys: any[] = [];

  constructor(public cartService: CartService, public productService: ProductsService, 
    private appData: AppStateService,
    public angularFirestore: AngularFirestore) {
  }

  ngOnInit(): void {
    // this.cartService.getItems();
    // this.cartService.getUserId();
    this.appData.cartItems$$.subscribe(jerseys => this.jerseys = jerseys);
  }

}
