import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/derective/blocks-style.directive';
import { ITour, ITourTypeSelect } from 'src/app/modals/tours';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription, debounce, debounceTime, fromEvent } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterContentChecked, OnDestroy, AfterViewInit {
  tickets: ITour[] | null;
  ticketsCopy: ITour[];
  value:string;
  renderComplete:boolean;
  tourUnsubscriber: Subscription;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketStorage: TiсketsStorageService,
    private userService: UserService,
    private cdref: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
      this.userService.setToken('user-private-token');
      this.ticketService.getTickets().subscribe(
        (data) => {
             this.tickets = data;
             this.ticketsCopy = [...this.tickets];
             this.ticketStorage.setStorage(data);
        }
      )
      this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
        console.log('data', data)
        setTimeout(() => {
 
          this.blockDirective.updateItems();
    
          this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
        });
        let ticketType: string;
        switch (data.value) {
          case "single":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
            break;
          case "multi":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
            break;
          case "all":
            this.tickets = [...this.ticketsCopy];
            break;
        
        }
        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          const dateValue = dateWithoutTime[0]
          console.log('dateValue',dateValue)
          this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
        }
      });
  }
  
  ngAfterViewInit(): void { 
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev:any) => {
        if (this.ticketSearchValue){  
          console.log('ticketSearchValue',this.ticketSearchValue)       
          this.tickets = this.ticketsCopy.filter((el)=> el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
          this.blockDirective.updateItems();
          this.blockDirective.initStyle(0);
        }else{
          this.tickets = [...this.ticketsCopy];
          this.blockDirective.updateItems();
          this.blockDirective.initStyle(0);
        }
      });
  }


  findTours(ev: Event):void{
    const searchValue = (<HTMLInputElement>ev.target).value;
    if (searchValue){
      this.tickets = this.ticketsCopy.filter((el)=> el.name.includes(searchValue));
    }else{
      this.tickets = [...this.ticketsCopy];
    }
  }

  goToTicketInfoPage(item: ITour){
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.renderComplete = true;
 }

 ngOnDestroy() {
  this.tourUnsubscriber.unsubscribe();
  this.searchTicketSub.unsubscribe();
  this.blockDirective.updateItems();
 }
}
