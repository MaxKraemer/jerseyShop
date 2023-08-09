import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ProductsService} from "../../service/products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public productSubscription: Subscription | undefined;
  jersey: any;

  constructor(public cartService: CartService, public productService: ProductsService, 
    public angularFirestore: AngularFirestore, public firestore: Firestore, public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const userCart = collection(this.firestore, 'users', user.uid, 'cart');
        const cartQuery = query(userCart);
        
        getDocs(cartQuery).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.jersey = doc.data();
            console.log('this.jersey', this.jersey);
            
          });
        }).catch((error) => {
          console.error('Error fetching cart data:', error);
        });
      }
    });
  }
}
