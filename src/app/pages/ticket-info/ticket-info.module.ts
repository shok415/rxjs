import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketInfoRoutingModule } from './ticket-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TicketInfoRoutingModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    CalendarModule,
    CarouselModule,
    FormsModule
  ]
})
export class TicketInfoModule { }
