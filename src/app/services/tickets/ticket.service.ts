import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ICustomTicketData, INearestTour, ITour, ITourLocation, ITourTypeSelect } from 'src/app/modals/tours';
import { TicketRestService } from '../rest/ticket-rest.service';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();

  private updateTicketsSubject = new Subject<ITour[]>();
  readonly updateTickets$ = this.updateTicketsSubject.asObservable();
  constructor(private ticketServiceRest: TicketRestService, 
    ) { }


  getError(): Observable<any>{
    return this.ticketServiceRest.getRestError();
  }

  createTour(body: any) {
    return this.ticketServiceRest.createTour(body);
  }

  updateTickets(data: any): void {
    this.updateTicketsSubject.next(data);
  }

  getTickets(): Observable<ITour[]>{ 
    return this.ticketServiceRest.getTickets();
  }

  // 1 вариант доступа к Observable  
   readonly ticketType$ = this.ticketSubject.asObservable(); 
  
  
   // 2 вариант доступа к Observable 
  
   getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
   }
    
   updateTour(type:ITourTypeSelect): void {
     this.ticketSubject.next(type);
   }
  
   getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }
  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }

  transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el) => {
    const newEl = <ICustomTicketData> {...el};
    newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {};
    newTicketData.push(newEl);
    });
    return newTicketData;
    }

  getRandomNearestEvent(type:number):Observable<INearestTour>{
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }

  getNearestTicketsByName(name:string):Observable<INearestTour[]>{
    return this.ticketServiceRest.getNearestTicketsByName(name);
  }

  sendTourData(data:any):Observable<any>{
    return this.ticketServiceRest.sendTourData(data)
  }
}
