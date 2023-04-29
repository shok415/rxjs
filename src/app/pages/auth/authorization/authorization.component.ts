import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/modals/users';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


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

  loginText="Логин";
  pswrdText='Пароль';
  
  authTextButton: string;

  @Input() inputProp = 'test';
  @Input() inputObj:any;

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService) { }

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
        cardNumber: this.cardNumber
      }
      if (this.authService.checkUser(authUser)){
          this.userService.setUser(authUser)
          this.userService.setToken('user-private-token');
          this.router.navigate(['tickets/tickets-list']);
      }else{
        this.messageService.add({severity:'error', summary:'Такого пользователя нет'});
      }
  }


}

