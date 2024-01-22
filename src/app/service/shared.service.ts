import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private orderPlacedSource = new Subject<boolean>();
  orderPlaced$ = this.orderPlacedSource.asObservable();

  constructor() { }

  orderPlaced(status: boolean) {
    this.orderPlacedSource.next(status);
  }
}