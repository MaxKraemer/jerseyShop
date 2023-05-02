import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public jerseyImages = [
    {
      "id": "1",
      "jersey": "assets/img/miami-heat-nike-association-edition-swingman-jersey-white-tyler-herro-unisex_ss4_p-13348923+u-1dikza0eok4kjt0rnvw5+v-48e2da738eb44475901238d6b8c2e0a7.webp",
      "name" : "Miami Heat White Jersey - Tyler Herro",
      "price" : "95.00 €"
    },
    {
      "id": "2",
      "jersey": "assets/img/miami-heat-nike-icon-swingman-jersey-bam-adebayo-mens_ss4_p-11899451+u-1fuli8p9dc7vwwfvf7rs+v-879125124ffd4fa782c5cffa84d73a1c.webp",
      "name" : "Miami Heat Icon Black Jersey - Bam Adebayo",
      "price" : "95.00 €"},
    {
      "id": "3",
      "jersey": "assets/img/miami-heat-jordan-statement-swingman-jersey-jimmy-butler-mens_ss4_p-12041618+u-pay1mg2r89sze0p8ey02+v-9f834e51a85a4e3a8ed2dbb3118ffb24.webp",
      "name" : "Miami Heat Statement Red Jersey - Jimmy Butler",
      "price" : "95.00 €"},
    {
      "id": "4",
      "jersey": "assets/img/miami-heat-nike-city-edition-swingman-jersey-22-white-jimmy-butler-unisex_ss4_p-13366627+u-2mo5lyj54r6tmsjye87c+v-274285e9ee694e55b2a5e803cb9df043.webp",
      "name" : "Miami Heat City Jersey - Jimmy Butler",
      "price" : "95.00 €"},
    {
      "id": "5",
      "jersey": "assets/img/miami-heat-nike-classic-edition-swingman-jersey-white-bam-adebayo-unisex_ss4_p-13364103+u-p1ffypfje4hyr7rugv3v+v-a176013163f5486fbe18c8a9df28b1c3.webp",
      "name" : "Miami Heat Classic Jersey - Bam Adebayo",
      "price" : "95.00 €"},
    {
      "id": "6",
      "jersey": "assets/img/miami-heat-nike-city-edition-swingman-jersey-jimmy-butler-mens_ss4_p-13300365+u-z5a4rpkoek755m69t6h5+v-6cbbb1b6ae484ac399e46bb207184136.webp",
      "name" : "Miami Heat City Jersey - Jimmy Butler",
      "price" : "95.00 €"},
    {
      "id": "7",
      "jersey": "assets/img/mens-mitchell-and-ness-dwyane-wade-red-miami-heat-2005-06-hardwood-classics-swingman-jersey_pi4702000_ff_4702500-aa9e9502450f48f3caa3_full.webp",
      "name" : "Miami Heat Mitchell & Ness Jersey - Dwyane Wade",
      "price" : "95.00 €"},
    {
      "id": "8",
      "jersey": "assets/img/youth-mitchell-and-ness-alonzo-mourning-black-miami-heat-1996-97-hardwood-classics-swingman-jersey_pi4853000_ff_4853848-8a109f8d9352653c3a3b_full.webp",
      "name" : "Miami Heat Classic Black Jersey - Alonzo Mourning",
      "price" : "95.00 €"},
    {
      "id": "9",
      "jersey": "assets/img/mens-mitchell-and-ness-shaquille-oneal-black-miami-heat-2005-06-hardwood-classics-swingman-jersey_pi4380000_ff_4380755-33ac2ef83defdd8bae84_full.webp",
      "name" : "Miami Heat Mitchell & Ness Classic - Shaquille O'Neal",
      "price" : "95.00 €"},
  ];

  constructor() { }

  ngOnInit() {


  }


}

