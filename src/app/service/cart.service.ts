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
          console.log('product', product);
          this.productSubject.next(product);
        }
      });

      this.bagdeCount++;
    }

    clearCart() {
      this.afAuth.user.subscribe((user) => {
        if (user) {
          const userCart = collection(this.firestore, 'users', user.uid, 'cart');
          const cartQuery = query(userCart);
    
          getDocs(cartQuery)
            .then((querySnapshot) => {
              const deletePromises: any[] = [];
              querySnapshot.forEach((docSnapshot) => {
                const deletePromise = deleteDoc(doc(userCart, docSnapshot.id));
                console.log('deletePromise', deletePromise);
                
                deletePromises.push(deletePromise);
              });
    
              return Promise.all(deletePromises);
            })
            .then(() => {
              console.log('Cart cleared.');
            })
        }
      });
    }
    
  }
