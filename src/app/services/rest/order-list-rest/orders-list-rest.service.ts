import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/modals/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersListRestService {

  constructor(private http: HttpClient) { }

  getOrdersList(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>('http://localhost:3000/order/');
}
}
