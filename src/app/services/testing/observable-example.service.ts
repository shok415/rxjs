import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObservableExampleService {
  private myBehaviorSubject = new BehaviorSubject<string>("cat goes meow")
  private mySubject = new Subject<string>();
  private myObservable = new Observable<string>(/*(subscriber => {
    setTimeout(() => {
      subscriber.next('some data');
    }, 3000)
  })*/)
  constructor() { }

  initObservable():void{
    const observable = new Observable((subscriber =>{
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next('asyncData');
        subscriber.error('err')
      }, 3000)
    }))
  }

  getObservable(): Observable<string> {
    return this.myObservable;
  }

  getSubject(): Subject<string> {
    return this.mySubject;
  }

  getBehaviorSubject(): BehaviorSubject<string>{
    return this.myBehaviorSubject;
  }
}
