import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMenuType } from 'src/app/modals/menuType';
import { IUser } from 'src/app/modals/users';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private settingsActive = false;
  textProp:string;
  @Input() menuType: IMenuType;
  user:IUser;
  items: MenuItem[];
  time:Date;
  private timerInterval: number;
  private settingActive = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.items = this.initMenuItems();

  this.timerInterval = window.setInterval( ()=>{
    this.time = new Date();
  }, 1000)

  this.user = this.userService.getUser();
  if (this.user){
    this.textProp = this.user.login;
  }else{
    this.textProp = "No User"
  }
  }

  ngOnDestroy(): void{
    if(this.timerInterval){
      window.clearInterval(this.timerInterval);
    }
  }
  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
 }
  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command: ()=>{
          this.userService.removeToken();
        }
      },
 
    ];
  }
}
