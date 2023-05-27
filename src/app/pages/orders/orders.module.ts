import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';


@NgModule({
  declarations: [OrdersComponent, OrderListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TabViewModule,
    FormsModule,
    ToastModule,
    TableModule
  ],
  providers:[]
})
export class OrdersModule { }
