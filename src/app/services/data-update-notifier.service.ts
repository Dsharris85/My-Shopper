import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { EventEmitter } from 'stream';
import { DataUpdateNotificationType } from '../models/dataNotifications';

@Injectable({
  providedIn: 'root'
})
export class DataUpdateNotifierService {
  public notifyTypes = DataUpdateNotificationType;

  // public notification: Observable<string>;
  public notification = new EventEmitter<DataUpdateNotificationType>();

  constructor() { }

  public notify(update: DataUpdateNotificationType): void {
    console.log(this.notifyTypes[update]);
    this.notification.emit(update);
  }

  // public notify(update: DataUpdateNotificationType): Observable<DataUpdateNotificationType> {

  //   return of(update);
  // }
}
