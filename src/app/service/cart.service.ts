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
  }

  badgeCount() {
    this.bagdeCount++;
  }

  addToCart(product: any) {
    const jersey = collection(this.firestore, 'jerseys');
    setDoc(doc(jersey), product);
    console.log(product);
  }

  getItems(): any {
    this.angularFirestore.collection('jerseys').valueChanges().subscribe((data) => {
      this.jerseys = data;
      console.log(this.jerseys, 'products');
    });
  }

  deleteJersey(index: number) {
    this.angularFirestore.collection('jerseys').doc(this.jerseys[index].id).delete();
  }




}
