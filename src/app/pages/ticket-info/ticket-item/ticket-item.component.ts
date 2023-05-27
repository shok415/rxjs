import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, fromEvent } from 'rxjs';
import { IOrder } from 'src/app/modals/order';
import { ICustomTicketData, INearestTour, ITour, ITourLocation } from 'src/app/modals/tours';
import { IUser } from 'src/app/modals/users';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private ticketStorage: TiсketsStorageService,
    private userService: UserService,
    private ticketService: TicketService,
    private http:HttpClient) { }

    nearestTours: INearestTour[];
    toursLocation: ITourLocation[];
    @ViewChild('ticketSearch') ticketSearch: ElementRef;
    searchTicketSub: Subscription;
    ticketSearchValue: string;
    ticketRestSub:Subscription;
    searchTypes = [1,2,3]

  ngOnInit(): void {
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId){
      const ticketStorage = this.ticketStorage.getStorage();   
      this.http.get<ITour>(`http://localhost:3000/tours/${paramValueId}`).subscribe((data)=>{
        console.log(data)
        this.ticket = data;
      });   
    }

    this.user = this.userService.getUser();

    this.userForm = new FormGroup({
      firstName: new  FormControl("",{validators: Validators.required}),
      lastName: new  FormControl("",[Validators.required, Validators.minLength(2)]),
      cardNumber: new  FormControl(""),
      birthDay: new  FormControl(""),
      age: new  FormControl(""),
      citizen: new FormControl("")
    })

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) =>{
      this.nearestTours = data[0];
      this.toursLocation = data[1];
      this.nearestTours = this.transformData(data[0],data[1]);
    })
  }

  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev) => {
      this.initSearchTour();
    })
  }

  onSubmit(): void {
  }

  selectDate(ev:Event): void {
  }

  initSearchTour(): void{
    const type = Math.floor(Math.random()*this.searchTypes.length);
    if (this.ticketRestSub && !this.searchTicketSub.closed){
      this.ticketRestSub.unsubscribe();
    }
    console.log(this.ticketSearchValue)
    
    this.ticketRestSub = this.ticketService.getNearestTicketsByName(this.ticketSearchValue).subscribe((data) => {
      //this.nearestTours = data
      this.nearestTours = this.ticketService.transformData(data, this.toursLocation)
    })

    // this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
    //   this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    // })
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

    initTour():void{
      const userData = this.userForm.getRawValue();
      const postData = {...this.ticket,...userData};

        const userId = this.userService.getUser()?.id || null
        const postObj: IOrder = {
          age:postData.age,
          birthDay:postData.birthDay,
          cardNumber:postData.cardNumber,
          tourId:postData._id,
          userId:userId
        }

        console.log('postData',postData)
        console.log('this.userForm.getRawValue()',this.userForm.getRawValue())
      
      this.ticketService.sendTourData(postObj).subscribe()
    }
}
