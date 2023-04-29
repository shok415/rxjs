import { Injectable } from '@angular/core';
import { StatisticRestService } from '../rest/statistic-rest/statistic-rest.service';
import { Observable, map } from 'rxjs';
import { ICustomStatisticUser } from 'src/app/modals/users';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private statisticUserRest: StatisticRestService) { }

  getUserStatistic():Observable<ICustomStatisticUser[]>{
    return this.statisticUserRest.getUserStatistic().pipe(
      map((data) =>{
        const newDataArr: ICustomStatisticUser[]=[];
        data.forEach((el)=>{
          const newDataObj: ICustomStatisticUser = {
            id: el.id,
            name: el.name,
            city: el.address.city,
            company: el.company.name,
            phone: el.phone,
            street: el.address.street
          };
          newDataArr.push(newDataObj)
        })
        return newDataArr;
      })
    )
  }
}
