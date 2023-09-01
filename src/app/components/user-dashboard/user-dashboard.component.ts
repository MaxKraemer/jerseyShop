import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  constructor(
    public angularFirestore: AngularFirestore,
    public firestore: Firestore,
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    public cartService: CartService,
  ) {}
  
  public user: any;
  public jerseys: any[] = [];
  public jerseyData: any[] = []; // Initialize as an array

  ngOnInit(): void {
    this.auth.userData().subscribe((user: any) => {
      this.user = user;
      this.jerseyItems();
      this.getItemsFromCart();
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

  public jerseyItems(): void {
    this.jerseys = this.cartService.jerseys;
  }

}
