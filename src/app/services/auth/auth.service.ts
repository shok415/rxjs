import { Injectable } from '@angular/core';
import { IUser } from 'src/app/modals/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() { }

  checkUser(user: IUser): boolean{
/*
    const isUserExists = this.usersStorage.find((el:IUser) => el.login === user.login);
    if (isUserExists){
      return isUserExists.password === user.password;
    }
    return false;*/
    let userInStore: IUser = <IUser>{} ;
    for(let i=0; i<localStorage.length; i++) {
      userInStore = JSON.parse(window.localStorage.getItem('user_'+i)|| '{}')
      if (userInStore){
        if(user.login === userInStore.login){
          return userInStore.password === user.password;
        }
      }
    }
    return false;
  }

  setUser(user: IUser):void{

    const isUserExists = this.usersStorage.find((el:IUser) => el.login === user.login);
    if (!isUserExists && user?.login){
      this.usersStorage.push(user)
    }

  }

  isUserExists(user: IUser): boolean{
    const isUserExists = this.usersStorage.find((el:IUser) => el.login === user.login);

    return !!isUserExists;
  }

}
