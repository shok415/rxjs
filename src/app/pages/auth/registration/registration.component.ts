import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { IUser } from 'src/app/modals/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/configService/config.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  password:string;
  password_repeat:string;
  email:string;
  card_number:string;
  saveLocalStorage:boolean;
  showCardNumber:boolean;

  constructor(private messageService: MessageService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  registration(ev: Event):void | boolean{

    if(this.password !== this.password_repeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }

    const userObj: IUser = {
      password: this.password,
      login: this.login,
      cardNumber: this.card_number,
      email: this.email
    }

    if(!this.authService.isUserExists(userObj)){
      this.authService.setUser(userObj);
      this.messageService.add({severity:'success', summary:'Регистрация завершена'});
      if(this.saveLocalStorage == true){
        localStorage.setItem('user_'+localStorage.length, JSON.stringify(userObj));
      }
    }else{
      this.messageService.add({severity:'warn', summary:'Пользователь уже существует'});
    }

  }



}
