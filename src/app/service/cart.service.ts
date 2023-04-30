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
  public products: any[] = [];

  constructor(public productService: ProductsService, public firestore: Firestore, public angularFirestore: AngularFirestore) {
  }

  badgeCount() {
    this.bagdeCount++;
  }

  addToCart(product: any) {
    const jersey = collection(this.firestore, 'jerseys');
    setDoc(doc(jersey), product);
    console.log(product);
    this.updateCart();
  }

  getItems(): any {
    this.angularFirestore.collection('jerseys').valueChanges().subscribe((data) => {
      this.products = data;
      console.log(this.products, 'products');
    });
  }

  deleteJersey(index: number) {
    this.jerseys.splice(index, 1);
    this.bagdeCount = this.jerseys.length;
    this.updateCart();
  }

  updateCart() {
    this.bagdeCount = this.jerseys.length;
  }


}
