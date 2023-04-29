import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, pipe, take, takeUntil } from 'rxjs';
import { IUser } from 'src/app/modals/users';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsData: Subscription;
  settingsDataSubject: Subscription;
  subjectForUnsubscribe = new Subject();
  user:IUser;
  textProp:string;
  constructor(private observableExampleService: ObservableExampleService,
              private settingsService: SettingsService,
              private userService: UserService) { }

  ngOnInit(): void {

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data)=>{
      console.log("settings data",data)
    })

    /*this.settingsData = this.settingsService.loadUserSettings().subscribe((data)=>{
      console.log("settings data",data)
    })*/

    this.settingsService.getSettingSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data)=>{
      console.log("settings data",data)
    })

    this.user = this.userService.getUser();
    if (this.user){
      this.textProp = this.user.login;
    }else{
      this.textProp = "No User"
    }
    


  }

  ngOnDestroy(){
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }


  //Вкладки


  
}
