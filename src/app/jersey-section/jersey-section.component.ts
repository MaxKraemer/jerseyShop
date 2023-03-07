import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-jersey-section',
  templateUrl: './jersey-section.component.html',
  styleUrls: ['./jersey-section.component.css']
})
export class JerseySectionComponent implements OnInit{

  jerseyImages = [
    {"jersey": "assets/img/23-fastbreak-jersey-city-edition_pi4900000_ff_4900361-a62a4ef6ad028d688904_full.webp"},
    {"jersey": "assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758898-1d5778c9b6c54148e18b_full.webp"},
    {"jersey": "assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758915-e830a7d84d7ccc6ef2ad_full.webp",}
  ];

  constructor() { }

  ngOnInit() {
    this.getJerseyImages()
  }

  getJerseyImages() {
    return this.jerseyImages.map(jersey => {
      console.log(jersey.jersey)
      return jersey.jersey;
    });
  }



}
