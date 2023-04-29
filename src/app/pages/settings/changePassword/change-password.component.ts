import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/modals/users';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  currentPsw: string;
  newPsw: string;
  newPswRepeat: string;
  user: IUser;
  constructor(private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  changePsw(ev: Event): void {

    
    if (this.newPsw !== this.newPswRepeat) {
      this.messageService.add({ severity: 'error', summary: 'Пароли не совпадают' });
    } else {
      this.user = this.userService.getUser();
      let userInStore: IUser = <IUser>{};
      for (let i = 0; i < localStorage.length; i++) {
        userInStore = JSON.parse(window.localStorage.getItem('user_' + i) || '{}')
        if (userInStore) {
          if (this.user.login === userInStore.login) {
            if (this.currentPsw !== userInStore.password){
              this.messageService.add({ severity: 'error', summary: 'Неккоректный текущий пароль' });
            }else{
              userInStore.password = this.newPsw;
              localStorage.setItem('user_' + i, JSON.stringify(userInStore));
              this.messageService.add({ severity: 'success', summary: 'Пароль изменен' });
            }
          }
        }
      }
    }
  }


}
