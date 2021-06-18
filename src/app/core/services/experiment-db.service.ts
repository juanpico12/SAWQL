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
  userEmail :string;
  private dbPath = '/experiments';

  experimentsRef: AngularFireList<Experiment[]> = null;
  actualExperiment : Experiment =null;

  constructor(private db: AngularFireDatabase , private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        //Firebase keys cannot have a period (.) in them, so this converts the emails to valid keys
        this.userEmail = this.emailToKey(user.email);
        this.experimentsRef = db.list(this.dbPath+'/'+ this.userEmail);
      } 
    })
  }

  setActualExperiment(experiment : Experiment){
    this.actualExperiment = experiment;
  }
  getActualExperiment(){
    return this.actualExperiment;
  }

  getAll(): AngularFireList<Experiment[]> {
    return this.experimentsRef;
  }

  create(experiment: Experiment): any {
    if(!!this.userEmail){
      return this.db.database.ref(this.dbPath+'/'+this.userEmail+'/experiments').push(experiment)
    }else{
      return null;
    }
  }

  update(experiment : Experiment) : Promise<void>{
    if(!!this.userEmail){
      const reference =   this.db.database.ref(this.dbPath+'/'+this.userEmail+'/experiments/'+this.actualExperiment.key)
      return reference.update({
        ...experiment,
        logs : experiment.logs,
        date : experiment.date
      })
    }else{
      return null;
    }
  }

  emailToKey(emailAddress) {
    return emailAddress.replace(/\./g, ',')
 }
  //if last experiment is undefined/null it means that we are asking for the first experimients
  getExperiments(size, lastExperiment,userMail){
    const email = this.emailToKey(userMail)
    const db = this.db.database.ref(this.dbPath+'/'+email+'/experiments')
    let expermients : Experiment [];
    if(!!lastExperiment){
      db.startAfter(lastExperiment).limitToLast(size).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }else{
      db.limitToLast(size).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  } 

}
