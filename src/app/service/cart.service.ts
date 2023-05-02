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
      // if(data.docs.length === 0) {
      //   const jersey = collection(this.firestore, 'allProducts');
      //   // if not, add items in products service
      //   this.productService.jerseyImages.forEach((product) => {
      //     setDoc(doc(jersey), product);
      //   });
      //
      //   setTimeout(() => {
      //     this.angularFirestore.collection('allProducts').get().subscribe(allJersey => {
      //       console.log('got new items from database', allJersey.docs);
      //       this.productService.jerseyImages = allJersey.docs.map(doc => doc.data()) as any;
      //       console.log('2 this.productService.jerseyImages', this.productService.jerseyImages);
      //     });
      //   }, 3000);

     //   this.productService.jerseyImages = data.docs.map(doc => doc.data()) as any;
        console.log('1 this.productService.jerseyImages', this.productService.jerseyImages);
    });

    // retrieve items
    // use items instead of local list in products service
  }

  badgeCount() {
    this.bagdeCount++;
  }

  addToCart(product: any) {
    const jersey = collection(this.firestore, 'jerseys');
    console.log(product, 'product');
    setDoc(doc(jersey), product);
  }

  getItems(): any {
    this.angularFirestore.collection('jerseys').valueChanges().subscribe((data) => {
      this.jerseys = data;
      console.log(this.jerseys, 'products');
    });
  }

  deleteJersey(id: string): any {
    this.angularFirestore.collection('jerseys').get().subscribe((data) => {
      console.log('query snapshot', data.docs)
       data.docs.forEach((doc: any) => {
         console.log('deleting?', doc.data().id, id);
         if(doc.data().id === id) {
           this.angularFirestore.collection('jerseys').doc(doc.id).delete();
           console.log(doc.id, 'doc');
         }
        });
    });
  }


}
