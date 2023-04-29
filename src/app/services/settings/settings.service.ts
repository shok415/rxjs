import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISettings } from 'src/app/modals/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() { }

  loadUserSettings(): Observable<ISettings>{
    const settingsObservable = new Observable<ISettings>((subscriber)=>{
      const settingsData: ISettings =  {
        saveToken: true
      };
      subscriber.next(settingsData);
    });
    return settingsObservable;
  }

  loadUserSettingSubject(data: ISettings):any{
    this.settingsSubject.next(data)
  }

  getSettingSubjectObservable():Observable<ISettings>{
    return this.settingsSubject.asObservable();
  }
}
