import { Component } from '@angular/core';
import {ProductsService} from "../service/products.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(public products: ProductsService) {}

}
