import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {Observable} from "rxjs";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;

  constructor(public productService: ProductsService, public firestore: Firestore, public angularFirestore: AngularFirestore, public authService: AuthService) {
    // check if database has items
    this.angularFirestore.collection('allProducts').get().subscribe((data) => {
      console.log('1 this.productService.jerseyImages', this.productService.jerseyImages);
    });
  }

  badgeCount() {
    this.bagdeCount++;
  }

  // addToCart(product: any) {
  //   const jersey = collection(this.firestore, 'jerseys');
  //   setDoc(doc(jersey), product);
  // }

  // getItems(): any {
  //   this.angularFirestore.collection('jerseys').valueChanges().subscribe((data) => {
  //     this.jerseys = data;
  //   });
  // }

  public addToCart(product: any) {
    // Get the user ID from the AuthService
    this.authService.userData().subscribe((userData: any) => {
      if (userData && userData.uid) {
        const jersey = collection(this.firestore, "jerseys");
        const cartItem = { ...product, userId: userData.uid };

        setDoc(doc(jersey), cartItem).then(() => {
          console.log("Item added to cart:", cartItem);
        });
      } else {
        console.log("User not logged in");
      }
    });
}


  deleteJersey(id: string): any {
    this.angularFirestore.collection('jerseys').get().subscribe((data) => {
      data.docs.forEach((doc: any) => {
         if(doc.data().id === id) {
          this.angularFirestore.collection('jerseys').doc(doc.id).delete().then(() => {
             this.bagdeCount--;
          });
        }
      });
    });
  }


}
