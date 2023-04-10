import { Injectable } from '@angular/core';
import {ProductsService} from "./products.service";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  jerseys: any[] = [];
  public bagdeCount = 0;
  public products: any[] = [];

  constructor(public productService: ProductsService) {
    const storedJerseys = localStorage.getItem('jerseys');
    if(storedJerseys) {
      this.jerseys = JSON.parse(storedJerseys);
      this.bagdeCount = this.jerseys.length;
    }
  }

  badgeCount() {
    this.bagdeCount++;
  }

  addToCart(product: any) {
    this.jerseys.push(product);
    this.jerseys = JSON.parse(JSON.stringify(this.jerseys));
    this.updateCart();
  }

  getItems() {
    return this.jerseys;
  }

  deleteJersey(index: number) {
    this.jerseys.splice(index, 1);
    this.bagdeCount = this.jerseys.length;
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('jerseys', JSON.stringify(this.jerseys));
  }


}
