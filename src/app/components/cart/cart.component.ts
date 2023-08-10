import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ProductsService} from "../../service/products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { deleteDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public productSubscription: Subscription | undefined;
  jerseys: any[] = [];
  public bagdeCount = 0;

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
            const jerseyData = doc.data();
            console.log('this.jersey', jerseyData);

            this.jerseys.push(jerseyData); // Push the jersey data to the array
          });
        }).catch((error) => {
          console.error('Error fetching cart data:', error);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
