import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  constructor(
    public angularFirestore: AngularFirestore,
    public firestore: Firestore,
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    public cartService: CartService,
    private sharedService: SharedService
  ) {}

  public user: any;
  public jerseys: any[] = [];
  public jerseyData: any[] = [];
  displayJerseyData: boolean = false;
  public userCart: string | null | undefined;

  ngOnInit(): void {
    this.auth.userData().subscribe((user: any) => {
      this.user = user;
      this.jerseyItems();
      this.getItemsfromCart();
    });
  }

  getItemsfromCart(): void {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const userCart = collection(
          this.firestore,
          'users',
          user.uid,
          'orders'
        );
        const cartQuery = query(userCart);
        getDocs(cartQuery).then((querySnapshot) => {
          this.jerseyData = querySnapshot.docs.map(doc => doc.data());
        });
      }
    });
}

  public jerseyItems(): void {
    this.jerseys = this.cartService.jerseys;
  }
}
