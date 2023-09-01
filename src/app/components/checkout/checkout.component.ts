import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public user: any;
  public jerseyData: any[] = []; // Initialize as an array

  constructor(
    public angularFirestore: AngularFirestore,
    public firestore: Firestore,
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItemsFromCart();
    this.auth.userData().subscribe((user: any) => {
      console.log(user,'user');
      this.user = user;
    });
  }

  getItemsFromCart(): void {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const userCart = collection(this.firestore, 'users', user.uid, 'cart');
        const cartQuery = query(userCart);
        getDocs(cartQuery).then((querySnapshot) => {
          this.jerseyData = []; // Clear the array before adding items
          querySnapshot.forEach((doc) => {
          this.jerseyData.push(doc.data()); // Add each item to the array
          });
        });
      } else {
        const guestCart = collection(this.firestore, 'guestCart');
        const cartQuery = query(guestCart);
        getDocs(cartQuery).then((querySnapshot) => {
          this.jerseyData = []; // Clear the array before adding items
          querySnapshot.forEach((doc) => {
            this.jerseyData.push(doc.data()); // Add each item to the array
          });
        });
      }
    });
  }

  public placeOrder(): void {
    this.router.navigate(['/place-order']);
    this.cartService.clearCart();
  }

}
