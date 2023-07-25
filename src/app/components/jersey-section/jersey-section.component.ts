import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-jersey-section',
  templateUrl: './jersey-section.component.html',
  styleUrls: ['./jersey-section.component.css']
})
export class JerseySectionComponent implements OnInit{

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: 'assets/img/ezgif.com-gif-maker.jpg',
    };
    this.slides[1] = {
      src: 'assets/img/23-swingman-jersey-city-edition_pi4758000_ff_4758898-1d5778c9b6c54148e18b_full.webp',
    }
    this.slides[2] = {
      src: 'assets/img/miami-heat-nike-city-edition-swingman-jersey-22-white-jimmy-butler-unisex_ss4_p-13366627+u-2mo5lyj54r6tmsjye87c+v-274285e9ee694e55b2a5e803cb9df043.webp',
    }
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }


}
