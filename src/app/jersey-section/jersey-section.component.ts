import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";

@Component({
  selector: 'app-jersey-section',
  templateUrl: './jersey-section.component.html',
  styleUrls: ['./jersey-section.component.css']
})
export class JerseySectionComponent implements OnInit{

  constructor(public products: ProductsService) { }

  ngOnInit(): void {

  }


}
