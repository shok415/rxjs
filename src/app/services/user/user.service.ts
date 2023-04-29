import { Injectable } from '@angular/core';
import { IUser } from 'src/app/modals/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;
  private token:string | null;
  private usersStorage: IUser[] = [];

  constructor() { }

  getUser(): IUser { 
    return this.user;
   };
   
   setUser(user: IUser) {
    return this.user = user;
   };
   setToken(token:string):void{
    this.token = token;
    window.localStorage.setItem('user_token', JSON.stringify(token))
   }
   getToken(): string { 
      if(this.token){
        return this.token;
      }else{
        let token: any = window.localStorage.getItem('user_token');
        return token;
      }
   };
   removeToken(): void{
    this.token = null;
    window.localStorage.removeItem('user_token');
   }
}
