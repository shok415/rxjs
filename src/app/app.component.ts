import { Component, OnInit } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';
import { ConfigService } from './services/configService/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  constructor(private testing: ObservableExampleService,
    private configService: ConfigService){
    testing.initObservable();
  }


  ngOnInit(){
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {
      console.log("first myObservable", data)
    })
  }
}
