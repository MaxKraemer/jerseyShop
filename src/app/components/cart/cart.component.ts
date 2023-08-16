import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ProductsService} from "../../service/products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public productSubscription: Subscription | undefined;
  jerseys: any[] = [];
  public bagdeCount = 0;
  private subscription = new Subscription();

  constructor(public cartService: CartService, public productService: ProductsService, 
    public angularFirestore: AngularFirestore, public firestore: Firestore, public afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCartItems(): void {
    this.subscription.add(
      this.afAuth.user.subscribe((user) => {
        console.log('user', user);
        if (user) {
          const userCart = collection(this.firestore, 'users', user.uid, 'cart');
          const cartQuery = query(userCart);
  
          getDocs(cartQuery).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const jerseyData = doc.data();
              console.log('this.jersey', jerseyData);
              console.log('234567');
              
              this.jerseys.push(jerseyData); // Push the jersey data to the array
            });
          }).catch((error) => {
            console.error('Error fetching cart data:', error);
          });
        } else {
          const guestCart = collection(this.firestore, 'guestCart');
          const cartQuery = query(guestCart);
  
          getDocs(cartQuery).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const jerseyData = doc.data();
              console.log('this.jersey', jerseyData);
              console.log('234567');
              
              this.jerseys.push(jerseyData); // Push the jersey data to the array
            });
          }).catch((error) => {
            console.error('Error fetching cart data:', error);
          });
        }
      })
    );
  }

  deleteItemCart(item: any): void {
    this.cartService.deleteItemFromCart(item);
    this.jerseys = this.jerseys.filter((jersey) => jersey.id !== item.id);
  }  

  checkoutOrder(): void {
    this.router.navigate(['/checkout']);
  }
}
