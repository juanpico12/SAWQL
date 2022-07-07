import { Injectable } from '@angular/core';
import { Experiment } from 'src/app/shared/models/experiment';
import { Log } from 'src/app/shared/models/log';
import { LOG_ALERTS } from '../enums/logAlerts';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  LOG_ALERTS = LOG_ALERTS;
  actualLogs : Log[] = [];
  constructor() { }

  getLogs() : Log[]{
    let log : Log = {
      st : 'Sin registro de actividad',
      alert : this.LOG_ALERTS.NORMAL,
    }
    return !!this.actualLogs ? this.actualLogs : [log];
  }

  newLogs(){
    this.actualLogs = [];
  }

  addLog(st : string,alert : number, extraData ?: string ){
   console.log(st)
   console.log(extraData)
    let log : Log = {
      st : st,
      extraData : !!extraData ? extraData : null,
      alert : alert
    }
    this.actualLogs.push(log);
  }
}
