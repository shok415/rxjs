import { Injectable } from '@angular/core';
import { ITour } from 'src/app/modals/tours';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private ticketStorage: ITour[];
  constructor() { }

  setStorage(data: ITour[]): void {
    // запись данных в this.ticketStorage
    this.ticketStorage = data;
   }
   getStorage(): ITour[] {
    return this.ticketStorage;
 }
}
