import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public jerseyImages = [
    {
      "jersey": "assets/img/ezgif.com-gif-maker.jpg",
      "name" : "Phoenix Suns City Jersey - Kevin Durant",
      "price" : "95.00 €"
    },
    {
      "jersey": "assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758898-1d5778c9b6c54148e18b_full.webp",
      "name" : "Dallas Mavericks City Jersey - Luka Doncic",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758915-e830a7d84d7ccc6ef2ad_full.webp",
      "name" : "Los Angeles Lakers City Jersey - Lebron James",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/miami-heat-nike-city-edition-swingman-jersey-22-white-jimmy-butler-unisex_ss4_p-13366627+u-2mo5lyj54r6tmsjye87c+v-274285e9ee694e55b2a5e803cb9df043.webp",
      "name" : "Los Angeles Lakers City Jersey - Lebron James",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/golden-state-warriors-nike-city-edition-swingman-jersey-22-black-stephen-curry-unisex_ss4_p-13366656+u-149ylto68sfgw6ebgqnt+v-6376b213fa7a40e697e95d6a7beeb4de.webp",
      "name" : "Los Angeles Lakers City Jersey - Lebron James",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/memphis-grizzlies-jordan-statement-edition-swingman-jersey-light-blue-ja-morant-unisex_ss4_p-13365099+u-u4sqa1sqwunvqigwjmfg+v-232c064df42446f3b652a652f051e9ec.webp",
      "name" : "Los Angeles Lakers City Jersey - Lebron James",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/denver-nuggets-jordan-statement-edition-swingman-jersey-blue-nikola-jokic-unisex_ss4_p-13365083+u-wxs3f8kfictr5kxjzwuo+v-bfbde7130233452b848ec98f71289d9f.webp",
      "name" : "Denver Nuggets City Jersey - Nikola Jokic",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758941-9c5f474bf94de344a352_full.webp",
      "name" : "New York Knicks City Jersey - R.J. Barrett",
      "price" : "95.00 €"},
    {
      "jersey": "assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758952-ebb37463dd7a7b7dacf6_full.webp",
      "name" : "Philadelphia 76ers City Jersey - Joel Embiid",
      "price" : "95.00 €"},
  ];

  constructor() { }

  ngOnInit() {


  }


}

