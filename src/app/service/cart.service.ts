import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {BehaviorSubject, filter, map, Observable, switchMap, tap} from "rxjs";
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
  private productSubject = new BehaviorSubject<any>(null);
  product$ = this.productSubject.asObservable();
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
  
          // Emit the new product value to subscribers
          this.productSubject.next(product);
        }
      });
  
      // Increase the badge count when an item is added to the cart
      this.bagdeCount++;
    }
  
    deleteJerseyfromCart(product: any): void {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          const userCart = collection(this.firestore, 'users', user.uid, 'cart');
          deleteDoc(doc(userCart, product));
        }
      });
  
      // Decrease the badge count when an item is deleted from the cart
      this.bagdeCount--;
    }
    }
