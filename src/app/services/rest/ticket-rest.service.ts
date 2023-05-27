import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/modals/order';
import { INearestTour, ITour, ITourLocation } from 'src/app/modals/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  // getTickets(): Observable<ITour[]>{
  //     return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  // }

  getTickets(): Observable<ITour[]>{
    return this.http.get<ITour[]>('http://localhost:3000/tours/');
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    // return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/');
    return this.http.get<INearestTour[]>('http://localhost:3000/tours/');
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    switch (type) {
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json')
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
      case 2:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json')
      default:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
    }
  }

  sendTourData(data:IOrder):Observable<any>{
    return this.http.post('http://localhost:3000/order/',data)
  }

  createTour(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/tour-item/', body, {headers:{}})
  }

  getNearestTicketsByName(name:string): Observable<INearestTour[]> {
   // return this.http.get<INearestTour[]>(`http://localhost:3000/tour-item/ + ${name}`);
   return this.http.get<INearestTour[]>(`http://localhost:3000/tour-item/` + `${name}`);
  }
}

