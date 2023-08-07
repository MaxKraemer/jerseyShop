import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {filter, map, Observable, switchMap, tap} from "rxjs";
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;
  // public userId: any;

  constructor(public productService: ProductsService,

    public firestore: Firestore, public angularFirestore: AngularFirestore, public authService: AuthService, public angularFirebase: AngularFireDatabase) {
      this.angularFirestore.collection('allProducts').get().subscribe((data) => {
        console.log('1 this.productService.jerseyImages', this.productService.jerseyImages);
      });
    }
  
    public getBadgeCount(): number {
      return this.bagdeCount;
    }
  
    public addToCart(product: any) {
      const jersey = collection(this.firestore, 'jerseys');
      setDoc(doc(jersey), product);
      this.bagdeCount++; // Increase the badge count when an item is added to the cart
    }
    
    public getItems(): any {
      this.angularFirestore.collection('jerseys').valueChanges().subscribe((data) => {
        this.jerseys = data;
      });
    }
    
    public deleteJersey(id: string): any {
      this.angularFirestore.collection('jerseys').get().subscribe((data) => {
        data.docs.forEach((doc: any) => {
          if (doc.data().id === id) {
            this.angularFirestore.collection('jerseys').doc(doc.id).delete().then(() => {
              this.bagdeCount--; // Decrease the badge count when an item is deleted from the cart
            });
          }
        });
      });
    }
  }
