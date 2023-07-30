import {inject, Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import '@firebase/firestore';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;

  constructor(public productService: ProductsService, public firestore: Firestore, public angularFirestore: AngularFirestore) {
    // check if database has items
    this.angularFirestore.collection('allProducts').get().subscribe((data) => {
      console.log('1 this.productService.jerseyImages', this.productService.jerseyImages);
    });
  }

  badgeCount() {
    this.bagdeCount++;
  }

  addToCart(product: any) {
    const jersey = collection(this.firestore, 'jerseys');
    setDoc(doc(jersey), product);
  }

  getItems(): any {
    this.angularFirestore.collection('jerseys').valueChanges().subscribe((data) => {
      this.jerseys = data;
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
