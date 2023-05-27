import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/modals/users';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/modals/error';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnChanges{
  password: string;
  login: string;
  selectedValue:boolean;
  cardNumber: string;
  id:string;
  
  loginText="Логин";
  pswrdText='Пароль';
  
  authTextButton: string;

  @Input() inputProp = 'test';
  @Input() inputObj:any;

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться"
  }

  vipStatus(): void{}

  ngOnChanges(changes: SimpleChanges){
     
  }
  onAuth(ev: Event):void{
    const authUser: IUser ={
      password: this.password,
      login: this.login,
      cardNumber: this.cardNumber,
      id: this.id
    }
    this.http.post<{acess_token:string, id: string}>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data) => {
    authUser.id = data.id;
    this.userService.setUser(authUser);
    const token: string = 'user-private-token'+data.acess_token;
    this.userService.setToken(token);
    this.userService.setToStore(token);


    this.router.navigate(['tickets/tickets-list']);

  }, (err: HttpErrorResponse)=> {
    const serverError = <ServerError>err.error;
    this.messageService.add({severity:'warn', summary:serverError.errorText});
  });
}
}

