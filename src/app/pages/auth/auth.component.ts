import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  textProp="test"
  someObj:any;
  obj={a: "hehe",
      b:"not hehe"};
  constructor() { }

  ngOnInit(): void {
    this.someObj=this.obj;
  }

  changeProp() {  
    this.someObj = this.obj;
    const  randIndex = Math.random()  
    this.textProp = "newValue"+ randIndex  
    // this.textProp = "someeedf";
  }
}
