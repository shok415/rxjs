import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup
  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('',{validators:Validators.required}),
      description: new FormControl('',[Validators.required, Validators.minLength(3)]),
      tourOperator: new FormControl(),
      price: new FormControl(),
      img: new FormControl(),
    })
  }

  createTour():void{
    const tourDataRaw = this.tourForm.getRawValue();
    let formParams = new FormData();
    if(typeof tourDataRaw === 'object'){
      for(let prop in tourDataRaw){
        formParams.append(prop, tourDataRaw[prop])
      }
    }
    this.ticketService.createTour(formParams).subscribe(()=> {})
  }


  selectFile(ev:any):void{
    if (ev.target.files.length>0){
      const file =  ev.target.files[0];
      this.tourForm.patchValue({
        img:file
      });
    }

  }
}
