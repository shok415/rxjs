import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/modals/order';
import { OrdersListService } from 'src/app/services/orders-list/orders-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[];
  cols = [
    {field: 'age', header: 'Возраст'},
    {field: 'birthDay', header: 'День рождения'},
    {field: 'cardNumber', header: 'Номер карты'},
    {field: 'tourId', header: 'Id тура'},
    {field: 'userId', header: 'Id пользователя'}
  ]
  constructor(private ordersListService:OrdersListService) { }

  ngOnInit(): void {
    this.ordersListService.getOrderList().subscribe((data)=>{
      this.orders = data;
    })
  }

}
