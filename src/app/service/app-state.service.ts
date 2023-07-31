import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public userData$$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public allProducts$$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }
}
