import {Component, inject} from '@angular/core';
import {Firestore} from "@angular/fire/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  title = 'webShop';
}
