import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {filter, map, Observable, switchMap, tap} from "rxjs";
import { AuthService } from './auth.service';
import { AppStateService } from './app-state.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;
  public userId: any;

  constructor(public productService: ProductsService, 
    private appData: AppStateService,
    
    public firestore: Firestore, public angularFirestore: AngularFirestore, public authService: AuthService) {
    this.angularFirestore.collection('allProducts').get().subscribe((data) => {
      this.appData.allProducts$$.next(data.docs.map((doc) => doc.data()));
    });
  }

  public badgeCount() {
    this.bagdeCount++;
  }

  public getUserId(): void{
      this.appData.userData$$.subscribe((userData: any) => {
      this.userId = userData.uid;
      console.log('this.userId', this.userId);
      if (userData && userData.uid) {
        return userData.uid;
      }
    });
  }
  public addToCart(product: any) {
    const jersey = collection(this.firestore, 'cart');
    this.appData.userData$$
    .subscribe((userData: any | null) => {
      if (userData && userData.uid) {
        // logged in
        setDoc(doc(jersey), {userId: userData.uid, productId: product.id});
        console.log('userData.uid', userData.uid);
        
      } else {
        // guest user not logged in
        setDoc(doc(jersey), {productId: product.id, userId: -1});
      }
    });
  }

  public getItems(): any {
    let productsInShoppingCart: any = [];
    this.angularFirestore.collection('cart').valueChanges()
    .pipe(
      tap(res => {
        productsInShoppingCart = res;
        console.log('productsInShoppingCart', productsInShoppingCart);
      }),
      switchMap(() => this.appData.allProducts$$),
      map(allProducts => {
        return allProducts.filter((product: any) => {
          return productsInShoppingCart.find((item: any) => {
            return item.productId === product.id;
          });
        });
      })
    )
    .subscribe((data) => {
      this.jerseys = data;
      this.appData.cartItems$$.next(data);
      console.log('this.jerseys', this.jerseys);
    });
  }

  public deleteJersey(id: string): any {
    this.angularFirestore.collection('cart').get().subscribe((data) => {
      data.docs.forEach((doc: any) => {
         if(doc.data().productId === id) {
          this.angularFirestore.collection('cart').doc(doc.id).delete().then(() => {
             this.bagdeCount--;
          });
        }
      });
    });
  }

}
