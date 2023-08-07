import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {filter, map, Observable, switchMap, tap} from "rxjs";
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentReference } from '@firebase/firestore-types';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;
  // public userId: any;

  constructor(public productService: ProductsService,

    public firestore: Firestore, public angularFirestore: AngularFirestore, public authService: AuthService, public angularFirebase: AngularFireDatabase, private afAuth: AngularFireAuth) {
      this.angularFirestore.collection('allProducts').get().subscribe((data) => {
        console.log('1 this.productService.jerseyImages', this.productService.jerseyImages);
      });
    }
  
    addToCart(product: any): void {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          const userCart = collection(this.firestore, 'users', user.uid, 'cart');
          setDoc(doc(userCart), product);
          console.log('product', product);
        }
      });
      this.bagdeCount++; // Increase the badge count when an item is added to the cart
    }
  
    clearCart(): void {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          const userCart = collection(this.firestore, 'users', user.uid, 'cart');
          this.angularFirestore.collection('cart').get().subscribe((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              deleteDoc(doc.ref);
            });
          });
          console.log('userCart', userCart);
          
        }
      });
      this.bagdeCount = 0; // Reset the badge count to clear the cart
    }
    

  
    deleteJersey(id: string): void {
      this.angularFirestore.collection('cart').get().subscribe((data) => {
        data.docs.forEach((doc: any) => {
          if (doc.data().id === id) {
            this.angularFirestore.collection('cart').doc(doc.id).delete().then(() => {
              this.bagdeCount--; // Decrease the badge count when an item is deleted from the cart
            });
          }
        });
      });
    }
    }
