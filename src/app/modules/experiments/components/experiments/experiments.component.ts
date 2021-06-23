import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperimentDBService } from 'src/app/core/services/experiment-db.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { Experiment } from 'src/app/shared/models/experiment';
import * as _ from "lodash";
@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
})
export class ExperimentsComponent implements OnInit {
  experiments : Experiment[] = [];
  nextKey : any =null;
  prevKeys : any[] = [];
  nextFlag : any =false;
  prevFlag : any = false;
  size : number =5;
  public readonly EMAIL = 'email';
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,private experimentDBService : ExperimentDBService) { }

  ngOnInit(): void {
    this.form = this.createSearchExperimentsForm();
    
  }

  nextPage(){
    this.prevKeys.push(_.first(this.experiments).key)
    this.getExperiments(this.nextKey)
   }

   prevPage(){
    const prevKey = _.last(this.prevKeys)
    console.log(this.prevKeys);
    
    this.prevKeys = _.dropRight(this.prevKeys);
    console.log(this.prevKeys);
    console.log(prevKey);
    
    this.getExperiments(prevKey)
   }

  // searchExperiments(startKey?,endKey?){
  //   this.experimentDBService.getExperiments(this.size,startKey,this.form.get('email').value).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       this.experiments = Object.values(snapshot.val())  
  //       this.startKey= Object.keys(snapshot.val())[0];
  //       this.nextFlag =true;
  //       this.endKey= Object.keys(snapshot.val())[this.size-1];
  //       this.prevFlag =true;     
  //       console.log(this.experiments);
  //       console.log(this.startKey);  
  //       console.log( this.endKey);
        
  //     } else {
  //       this.experiments=null;
  //       this.nextFlag =false;
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     this.experiments=null;
  //     console.error(error);
  //   });
  // }

  getExperiments(key?){
    this.experimentDBService.getExperiments2(this.form.get('email').value,this.size,key).then((snapshot) => {
      if (snapshot.exists()) {
        
        this.experiments = Object.values(snapshot.val())
        this.nextKey= Object.keys(snapshot.val())[this.size];
        this.experiments = _.slice(this.experiments,0,this.size)  
        console.log(this.prevKeys);
        console.log(this.experiments);    
        console.log(this.nextKey);
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  createSearchExperimentsForm(): FormGroup {
    return this.formBuilder.group({
       [this.EMAIL]: ['', [CustomValidators.required('Mail de usuario requerido'),CustomValidators.email('Mail inválido')]],
    });
  }

}
