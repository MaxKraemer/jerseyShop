import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, deleteDoc, doc, Firestore, getDocs, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {BehaviorSubject, filter, map, Observable, Subject, switchMap, tap} from "rxjs";
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take, takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentReference } from '@firebase/firestore-types';
import { query } from 'firebase/firestore';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;
  private productSubject = new BehaviorSubject<any>(null);
  product$ = this.productSubject.asObservable();
  private unsubscribe$ = new Subject<void>();
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
          this.productSubject.next(product);
          const userOrders = collection(this.firestore, 'users', user.uid, 'orders');
          setDoc(doc(userOrders), product);
          this.productSubject.next(product);
        } else {
          const guestCart = collection(this.firestore, 'guestCart');
          setDoc(doc(guestCart), product);
          this.productSubject.next(product);
        }
      });

      this.bagdeCount++;
    }

    deleteItemFromCart(item: any): void {
      console.log('item', item);
      this.afAuth.user.subscribe((user) => {
        console.log('user', user);
        if (user) {
          const userCartPath = `users/${user.uid}/cart/`;
          this.angularFirestore.collection(userCartPath).get().subscribe((data) => {
            data.docs.forEach((doc) => {
              const cartItem: any = doc.data();
              if (cartItem.id === item.id) {
                this.angularFirestore.collection(userCartPath).doc(doc.id).delete();
                console.log('Deleted item with id', item.id);
              }
            });
          });
        } else {
          const guestCartPath = `guestCart/`;
          this.angularFirestore.collection(guestCartPath).get().subscribe((data) => {
            data.docs.forEach((doc) => {
              const cartItem: any = doc.data();
              console.log('cartItem', cartItem);
              if (cartItem.id === item.id) {
                this.angularFirestore.collection(guestCartPath).doc(doc.id).delete();
              }
            });
          });
        }
      });
      this.bagdeCount--;
    }

    clearCart(): void {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          const userCartPath = `users/${user.uid}/cart/`;
          this.angularFirestore.collection(userCartPath).get().subscribe((data) => {
            data.docs.forEach((doc) => {
              this.angularFirestore.collection(userCartPath).doc(doc.id).delete();
            });
          });
        } else {
          const guestCartPath = `guestCart/`;
          this.angularFirestore.collection(guestCartPath).get().subscribe((data) => {
            data.docs.forEach((doc) => {
              this.angularFirestore.collection(guestCartPath).doc(doc.id).delete();
            });
          });
        }
      });
    }

    showOrder(): void {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          const userCartPath = `users/${user.uid}/orders/`;
          this.angularFirestore.collection(userCartPath).get().subscribe((data) => {
            data.docs.forEach((doc) => {
              this.angularFirestore.collection(userCartPath).doc(doc.id).delete();
            });
          });
        } else {
          const guestCartPath = `guestCart/`;
          this.angularFirestore.collection(guestCartPath).get().subscribe((data) => {
            data.docs.forEach((doc) => {
              this.angularFirestore.collection(guestCartPath).doc(doc.id).delete();
            });
          });
        }
      });
    }
}
