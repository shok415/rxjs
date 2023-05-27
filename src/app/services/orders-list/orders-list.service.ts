import { Injectable } from '@angular/core';
import { OrdersListRestService } from '../rest/order-list-rest/orders-list-rest.service';
import { Observable, map } from 'rxjs';
import { IOrder } from 'src/app/modals/order';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersListService {

  constructor(private ordersListRestService:OrdersListRestService,
    private datePipe: DatePipe) { }

  getOrderList():Observable<IOrder[]>{
    return this.ordersListRestService.getOrdersList().pipe(
      map((data) =>{
        const newDataArr: IOrder[]=[];
        data.forEach((el)=>{
          const newDataObj: IOrder = {
            age: el.age,
            birthDay: this.datePipe.transform(el.birthDay , 'yyyy-MM-dd'),
            cardNumber: el.cardNumber,
            tourId: el.tourId,
            userId: el.userId,
          };
          newDataArr.push(newDataObj)
        })
        return newDataArr;
      })
    )
  }
}
