import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Experiment } from 'src/app/shared/models/experiment';
import { AngularFireDatabase , AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ExperimentDBService {
  userId : string;
  private dbPath = '/experiments';

  experimentsRef: AngularFireList<Experiment[]> = null;
  actualExperimentKey : string =null;

  constructor(private db: AngularFireDatabase , private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid
        this.experimentsRef = db.list(this.dbPath+'/'+this.userId);
      } 
    })
  }

  setActualExperimentKey(key : string){
    this.actualExperimentKey = key;
  }
  getActualExperimentKey(key : string){
    return this.actualExperimentKey;
  }

  getAll(): AngularFireList<Experiment[]> {
    return this.experimentsRef;
  }

  create(experiment: Experiment): any {
    if(!!this.userId){
      return this.db.database.ref(this.dbPath+'/'+this.userId+'/experiments').push(experiment)
    }else{
      return null;
    }
  }

  update(experiment : Experiment) : Promise<void>{
    if(!!this.userId){
      const reference =   this.db.database.ref(this.dbPath+'/'+this.userId+'/experiments/'+this.actualExperimentKey)
      return reference.update({
        ...experiment,
        logs : experiment.logs,
        date : experiment.date
      })
    }else{
      return null;
    }
  }

}
