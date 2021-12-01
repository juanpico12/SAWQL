import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperimentDBService } from 'src/app/core/services/experiment-db.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { Experiment } from 'src/app/shared/models/experiment';
import * as _ from "lodash";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
})
export class ExperimentsComponent implements OnInit {
   // Lottie
    optionsLottie: AnimationOptions = {
    path: 'assets/animations/atom.json',
  };
  experiments : Experiment[] = [];
  loadingPdf : boolean = false;
  openMatExpansion : string = null;
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

  animationCreated(animationItem: AnimationItem): void {
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
    let email = this.form.get('email').value.toLowerCase() ;
    this.experimentDBService.getExperiments2(email,this.size,key).then((snapshot) => {
      if (snapshot.exists()) {
        
        this.experiments = Object.values(snapshot.val())
        this.nextKey= Object.keys(snapshot.val())[this.size];
        this.experiments = _.slice(this.experiments,0,this.size)  
        console.log(this.prevKeys);
        console.log(this.experiments);    
        console.log(this.nextKey);
        
      } else {
        this.experiments= [];
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

  onChangeSize(e){
    console.log(e);
    if(!!e){
      if(e > 10){
        this.size = 10
      }
      this.getExperiments()
    }
  }

  onClickDownloadPDF(experiment,i) {
    console.log(i);
    
    console.log(experiment);
    console.log(experiment.key);
    this.openMatExpansion = experiment.key;
    this.loadingPdf =true;
    setTimeout(() => {
      // Extraemos el
    const DATA = document.getElementById(i);
    console.log(DATA);
    
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 40;
      const bufferY = 70;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.text('Estudiante : '+this.form.get(this.EMAIL).value,120,50,null,0)
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      this.loadingPdf = false;
      docResult.save(experiment.date+'_'+experiment.title+'_'+this.nameOnEmail(this.form.get(this.EMAIL).value));
      this.openMatExpansion = null;
    });
    }, 1000);
    
   
  }

  nameOnEmail(email : string){
    if(!!email){
      return email.split("@")[0]
    }else{
      ''
    }
  }
  

}
