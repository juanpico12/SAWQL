import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Item } from 'src/app/shared/models/item';
import { AnimationItem } from 'lottie-web';
import { SimDataService } from 'src/app/core/services/sim-data.service';
import { Observable, of, from, Subscription } from 'rxjs';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { SimMathService } from 'src/app/core/services/sim-math.service';
import { SimPhService } from 'src/app/core/services/sim-ph.service';
import { SOLUTION_DESCRIPTION } from 'src/app/core/enums/solution-description';
import { Chemical } from 'src/app/shared/models/chemical';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogService } from 'src/app/core/services/log.service';
import { LOG_ALERTS } from 'src/app/core/enums/logAlerts';
import { ExperimentDBService } from 'src/app/core/services/experiment-db.service';
import { Experiment } from 'src/app/shared/models/experiment';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { LottieEventsFacade } from 'ngx-lottie/src/events-facade';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  SOLUTION_DESCRIPTION = SOLUTION_DESCRIPTION;
  LOG_ALERTS =LOG_ALERTS;
  valueVol : number = 0;
  item1 : Item []= [];
  item2 : Item[]=  [];
  itemsOnTable : Item []=[] ;
  data :any[] ;
  acidosFuertes :Item[];
  acidosDebiles :Item[];
  basesFuertes : Item[];
  basesDebiles : Item[];
  instrumentos : Item[];
  agua : Item[];
  matraces : Item[];
  buretas : Item[];
  pipetas : Item[];
  probetas : Item[];
  vasoDePrecipitados : Item[];
  erlenmeyers : Item[]; 
  stringAlert : string ;


  //Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/microscope.json',
  };

  //Experimento actual ya guardado al menos una vez
  actualExperiment : Experiment;
  

  //**FLAGS */
  //Guardando/Actualizacion exp
  savingExperiment : boolean = false;

  //firstSave -> create experimente at Db , else update
  firstSave : boolean =true;
  //pour true -> Verter , pour false -> retirar
  pour : boolean =false;

  //Alert invalid vol
  alertQuantityInvalid : boolean =false;

  //Alert invalid matraz quantity
  alertMatrazQuantityInvalid : boolean =false;

  //Alert of 2 solutions
  alert2Solutions : boolean =false;

  //We have a phMetro on intem1 or item2 
  phMetro : boolean = false;

  //flags to recognize ac fuertes , debiles , agua , instr, bases fuertes ,debiles (cant send vol to this ones)
  canPour : boolean = true ;
  canWithdraw : boolean = true;

  //the radio button changes for first time
  radioButtonOn : boolean = false;

  //enrasar option 
  enrasarOption : boolean = false;

  constructor(public SimDataService : SimDataService,
              public SimMathService : SimMathService,
              public SimPhService : SimPhService,
              public authService : AuthService,
              public logService : LogService,
              public experimentDBService : ExperimentDBService,
              public datePipe: DatePipe) { }
  
  
  ngOnInit(): void {
    this.SimDataService.getItems().subscribe((data) => this.data = data)
    this.setData();
    console.log(this.logService.getLogs());  
  }

  setData(){
    this.data.forEach((itemArray : any) => {

      switch(Object.keys(itemArray)[0]) { 
        case 'acidosFuertes': { 
           this.acidosFuertes= itemArray.acidosFuertes;
           break; 
        } 
        case 'acidosDebiles': { 
          this.acidosDebiles= itemArray.acidosDebiles;
          break; 
       } 
        case 'matraces': { 
          this.matraces= itemArray.matraces;
           break; 
        } 
        case 'basesFuertes': { 
          this.basesFuertes= itemArray.basesFuertes;
           break; 
        } 
        case 'basesDebiles': { 
          this.basesDebiles= itemArray.basesDebiles;
           break; 
        } 
        case 'buretas': { 
          this.buretas= itemArray.buretas;
           break; 
        } 
        case 'pipetas': { 
          this.pipetas= itemArray.pipetas;
           break; 
        } 
        case 'probetas': { 
          this.probetas= itemArray.probetas;
           break; 
        } 
        case 'vasoDePrecipitados': { 
          this.vasoDePrecipitados= itemArray.vasoDePrecipitados;
           break; 
        } 
        case 'erlenmeyers': { 
          this.erlenmeyers= itemArray.erlenmeyers;
           break; 
        }  
        case 'instrumentos': { 
          this.instrumentos= itemArray.instrumentos;
           break; 
        }  
        case 'agua': { 
          this.agua= itemArray.agua;
           break; 
        }  
        
        default: { 
           //statements; 
           break; 
        } 
     } 
    })
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  dropItem1(event: CdkDragDrop<string[]>) {
    let item : Item = {
      name: event.item.data.name,
      id: event.item.data.id,
      icon:event.item.data.icon,
      unit:event.item.data.unit,
      volMax:event.item.data.volMax,
      vol : event.item.data.vol,
      iconClass:event.item.data.iconClass,
      data: !!event.item.data.data ? event.item.data.data : null,
      chemical : !!event.item.data.chemical? event.item.data.chemical : null , 
    }
    console.log(event.item.data)
    let actualItem : Item = this.item1[0]; 
    console.log(event)
    console.log('nuevo:'+ event.item.data);
    console.log('actual:'+this.item1[0]);
    if ( event.previousContainer.id == 'item2' ) {
      if(!!actualItem){
        this.item2[0] = actualItem;
        this.item1[0] = item;
      }else{
        this.item2 = [];
        this.item1[0] = item;
      }
    }
    if ( event.previousContainer.id == 'table' ) {
      if(!!actualItem){
        this.itemsOnTable.push(actualItem);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }else{
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
    if ( event.previousContainer.id != 'table' && event.previousContainer.id != 'item2'  && event.previousContainer.id != 'item1') {
      if(!!actualItem){
        this.itemsOnTable.push(actualItem);
      }
    }
    this.item1 = [];
    this.item1[0] = item;
    this.checkItemType();
    //LOG ACTION
    this.logService.addLog('El usuario coloco '+this.item1[0].name+' en la mesa de trabajo (Item1)',this.LOG_ALERTS.NORMAL,this.getLogExtraDataSt(this.item1[0]));
    //Enrasar option only when its a matraz
    this.item1[0].id == 10 || this.item2[0]?.id == 10 ? this.enrasarOption=true : this.enrasarOption=false;

    console.log(this.logService.getLogs());  
    console.log(this.item1);
    console.log(this.item2);
    console.log(this.itemsOnTable);

  }

  dropItem2(event: CdkDragDrop<string[]>) {   
    let item : Item = {
      name: event.item.data.name,
      id: event.item.data.id,
      icon:event.item.data.icon,
      unit:event.item.data.unit,
      volMax:event.item.data.volMax,
      vol : event.item.data.vol,
      iconClass:event.item.data.iconClass,
      data: !!event.item.data.data ? event.item.data.data : null,
      chemical : !!event.item.data.chemical? event.item.data.chemical : null , 
    }
    let actualItem : Item = this.item2[0]; 
    console.log(item);
    console.log(actualItem);
    if ( event.previousContainer.id == 'item1' ) {
      if(!!actualItem){
        this.item1[0] = actualItem;
        this.item2[0] = item;
      }else{
        this.item1 = [];
        this.item2[0] = item;
      }
    }
    if ( event.previousContainer.id == 'table' ) {
      if(!!actualItem){
        this.itemsOnTable.push(actualItem);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }else{
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
    if ( event.previousContainer.id != 'table' && event.previousContainer.id != 'item1'  && event.previousContainer.id != 'item2') {
      if(!!actualItem){
        this.itemsOnTable.push(actualItem);
      }
    }
    this.item2 = [];
    this.item2[0] = item;
    this.checkItemType();
    //LOG ACTION
    this.logService.addLog('El usuario coloco '+this.item2[0].name+' en la mesa de trabajo (Item2)',this.LOG_ALERTS.NORMAL,this.getLogExtraDataSt(this.item2[0]));
    //Enrasar option only when its a matraz
    this.item2[0].id == 10 || this.item1[0]?.id == 10 ? this.enrasarOption=true : this.enrasarOption=false;

    console.log(this.item1);
    console.log(this.item2);
    console.log(this.itemsOnTable);
  }

  dropTable(e: CdkDragDrop<string[]>){
    console.log(e.item);
    // //SET VALUE TO CERO
    // if((!!this.item1 && !!this.item2)){
    //   // this.pour = false;
    //   this.valueVol =0 ;
    // }
    if (e.previousContainer === e.container) {
      moveItemInArray(this.itemsOnTable, e.previousIndex, e.currentIndex);
    } else { 
      if (e.previousContainer.id == 'item1' || e.previousContainer.id == 'item2' ) {  
        transferArrayItem(e.previousContainer.data,
                          e.container.data,
                          e.previousIndex,
                          e.currentIndex);
      }else{
        let item : Item = {
          name: e.item.data.name,
          id: e.item.data.id,
          icon:e.item.data.icon,
          unit:e.item.data.unit,
          volMax:e.item.data.volMax,
          vol : e.item.data.vol,
          iconClass:e.item.data.iconClass,
          data: !!e.item.data.data ? e.item.data.data : null,
          chemical : !!e.item.data.chemical? e.item.data.chemical : null , 
        }
        this.itemsOnTable.push(item);
      }
    }
    this.checkItemType();
    console.log(this.item1);
    console.log(this.item2);
    console.log(this.itemsOnTable);
    
  }

  onClickDeleteItemFromArray(e,item){

    let index = this.itemsOnTable.findIndex((it) => {
      return it===item
    })
    this.itemsOnTable.splice(index,1);
    this.checkItemType()
    
  }

  onClickDeleteItem1(e,item){
    this.item1 = [];
    this.checkItemType()
  }

  onClickDeleteItem2(e,item){
    this.item2 = [];
    this.checkItemType()
  }

  onChangeRadio(e) {
    this.radioButtonOn = true;
    if(e.value == 1 ){
      this.pour = false;
    }else{
      this.pour = true;
    }
  }

  onClickPourOrWithdraw(){
    this.checkItemType()
    //Generamos estos aux para usarlos en el log , ya que modificamos los chemicals orignales en el proceso
    let chemical1Aux : Chemical = {...this.item1[0].chemical};
    let chemical2Aux : Chemical = {...this.item2[0].chemical};
    console.log('chemical2Aux')
    if(this.pour){
      //Calculo automaticamente el valueVol si se utiliza la opcion ENRASAR
      // if(this.enrasarOption){
      //   this.valueVol = this.item1[0].volMax - this.item1[0].vol;
      // }
      //No permito que vuelva a verter otra sustancia si ya tiene 2
      console.log(this.item1[0].chemical.solutionOf2);
      console.log(this.item1[0]);
      if(!!this.item1[0] && !!this.item1[0].chemical?.solutionOf2 && this.item1[0].chemical.solutionOf2 == true && this.phMetro == false){
        this.alert2Solutions = true;
        this.canPour = false;
      }else{
          //nos fijamos si es un matraz el destino para asegurarnos que se vierta <= al vol aforado
          if(this.item1[0].id == 10 && (this.item1[0].vol + this.valueVol) > this.item1[0].volMax){
            //Se vertio en el matraz una cantidad mayor  a su aforo
            this.alertMatrazQuantityInvalid =true;
            this.logService.addLog('Cantidad a verter en matraz inválida -> El usuario quiso verter de un/una '+this.item2[0].name+' a un matraz de '+this.item1[0].volMax+' ml '+this.valueVol+' ml de '+chemical2Aux.name,this.LOG_ALERTS.ERROR);
          
        }else{
          if( this.SimMathService.canPour(this.item2[0].vol ,this.item1[0].vol ,this.item1[0].volMax , this.valueVol )){
            if(this.item1[0].vol ==0){
              this.setChemical2to1()
            }
            //Calculo nuevo volumen
              this.item1[0].vol = this.item1[0].vol + this.valueVol;
              this.item2[0].vol = this.item2[0].vol - this.valueVol;
            //Recalculo PH en destino 
            let pH: number = this.SimPhService.calculatePh(this.item1[0],this.item2[0],this.valueVol);
            //seteo descp
            this.setDescription(pH,this.item1[0]);
            console.log(pH);
            if(!!pH){
              this.item1[0].chemical.pH = pH;
            }
            //Recalculo PH en origen si se vacio el vol y reseteo chemical
            if(this.item2[0].vol <= 0){
            this.item2[0].chemical.pH = null;
            this.setChemicalToNull(this.item2[0])
            }
            //LOG ACTION
            this.logService.addLog('El usuario vertió de un/una '+this.item2[0].name+' a un/una '+this.item1[0].name+( !!chemical1Aux?.name ? ('('+chemical1Aux.name+')' ) : '' )+' '+this.valueVol+' ml de '+chemical2Aux.name,this.LOG_ALERTS.NORMAL,this.getLogExtraDataSt(this.item1[0],this.item1[0].name+' -> '));
          }else{
            //Cantidad a verter invalida
            this.alertQuantityInvalid =true;
            this.stringAlert = 'La cantidad seleccionada a verter es inválida'
            //LOG ACTION
            console.log('pasooo');
            
            this.logService.addLog('Cantidad a verter inválida -> El usuario quiso verter de un/una '+this.item2[0].name+' a un/una '+this.item1[0].name+( !!chemical1Aux?.name ? ('('+chemical1Aux.name+')' ) : ' ' )+' '+this.valueVol+' ml de '+chemical2Aux.name,this.LOG_ALERTS.WARN);
          }
        }
      }
      

      
    }else{
      // if(this.enrasarOption){
      //   this.valueVol = this.item2[0].volMax - this.item2[0].vol;
      // }
      //No permito que vuelva a verter otra sustancia si ya tiene 2
      if(!!this.item2[0] && !!this.item2[0].chemical?.solutionOf2 && this.item2[0].chemical.solutionOf2 == true && this.phMetro == false){
        this.alert2Solutions = true;
        this.canWithdraw = false;
      }else{
      //nos fijamos si es un matraz el destino para asegurarnos que se vierta <= al vol aforado
      if(this.item2[0].id == 10 && (this.item2[0].vol + this.valueVol) > this.item2[0].volMax){
        //Se vertio en el matraz una cantidad mayor  a su aforo
        this.alertMatrazQuantityInvalid =true;
        this.logService.addLog('Cantidad a verter en matraz inválida -> El usuario quiso retirar de un/una '+this.item1[0].name+' a un matraz de '+this.item2[0].volMax+' ml '+this.valueVol+' ml de '+chemical1Aux.name,this.LOG_ALERTS.ERROR);
      }else{
          if( this.SimMathService.canWithdraw(this.item1[0].vol ,this.item2[0].vol ,this.item2[0].volMax , this.valueVol )){
            if(this.item2[0].vol ==0){
              this.setChemical1to2()
            }
            this.item2[0].vol = this.item2[0].vol + this.valueVol;
            this.item1[0].vol = this.item1[0].vol - this.valueVol;
            //Recalculo PH en destino 
            let pH: number = this.SimPhService.calculatePh(this.item2[0],this.item1[0],this.valueVol);
            //seteo descp
            console.log(pH);
            
            this.setDescription(pH,this.item2[0]);
            if(!!pH){
              this.item2[0].chemical.pH = pH;
            }
            //Recalculo PH en origen si se vacio el vol y reseteo chemical
            if(this.item1[0].vol <= 0){
              this.item1[0].chemical.pH = null
              this.setChemicalToNull(this.item1[0])
            }
            //LOG ACTION
            this.logService.addLog('El usuario retiro de un/una '+this.item1[0].name+' a un/una '+this.item2[0].name+(!!chemical2Aux?.name ? ('('+chemical2Aux.name+')' ) : '' )+' '+this.valueVol+' ml de '+chemical1Aux.name,this.LOG_ALERTS.NORMAL,this.getLogExtraDataSt(this.item2[0],this.item2[0].name+' -> '));
          }else{
            //Cantidad a retirar invalida
            this.alertQuantityInvalid =true;
            this.stringAlert = 'La cantidad seleccionada a retirar es inválida'
            //LOG ACTION
            this.logService.addLog('Cantidad a retirar inválida -> El usuario quiso retirar de un/una '+this.item1[0].name+' a un/una '+this.item2[0].name+( !!chemical2Aux?.name ? ('('+chemical2Aux.name+')' ) : ' ' )+' '+this.valueVol+' ml de '+chemical1Aux.name,this.LOG_ALERTS.WARN);
    
          }
          
        }
      }

      
    }

    // //No permito que vuelva a verter/retirar otra sustancia 
    // if(!!this.item1[0] && !!this.item1[0].chemical?.solutionOf2 && this.item1[0].chemical.solutionOf2 == true && this.phMetro == false){
    //   this.alert2Solutions = true;
    //   this.canPour = false;
    // }else{
    //   if(!!this.item2[0] && !!this.item2[0].chemical?.solutionOf2 && this.item2[0].chemical.solutionOf2 == true && this.phMetro == false){
    //     this.alert2Solutions = true;
    //     this.canWithdraw = false;
    //   }
    // }
  }

  onClickenrasarOption(){
    if(this.pour){
      this.valueVol = this.item1[0].volMax - this.item1[0].vol;
    }else{
      this.valueVol = this.item2[0].volMax - this.item2[0].vol;
    }
    console.log(this.valueVol);
    
  }

  checkItemType(){ 
    //alertas en false
    this.alertQuantityInvalid =false;
    this.alert2Solutions = false;
    this.alertMatrazQuantityInvalid = false;
    // Identifico el pHMetro 
    if(!!this.item1[0] && !!this.item2[0] && this.item1[0].id == 310 ){
        this.phMetro = true;
    }else{
      if( !!this.item2[0] && !!this.item1[0] && this.item2[0].id == 310 ){
        this.phMetro = true;
      }else{
        this.phMetro = false;
      }
    }
    // Identifico ac fuertes , debiles , bases fuertes , debiles e instrumentos. Marco bandera para que no se les permita introductir vol
    if(!!this.item1[0]  && (this.item1[0].id >=100 && this.item1[0].id <400 ) ){
      this.canPour = false;
    }else{
      this.canPour = true;
    }
    if(!!this.item2[0]  && (this.item2[0].id >=100 && this.item2[0].id <400 )){
      this.canWithdraw = false;
    }else{
      this.canWithdraw = true;
    }

    // if(!!this.item1[0] && !!this.item1[0].chemical?.solutionOf2 && this.item1[0].chemical.solutionOf2 == true && this.phMetro == false){
    //   this.alert2Solutions = true;
    //   this.canPour = false;
    // }else{
    //   if(!!this.item2[0] && !!this.item2[0].chemical?.solutionOf2 && this.item2[0].chemical.solutionOf2 == true && this.phMetro == false){
    //     this.alert2Solutions = true;
    //     this.canWithdraw = false;
    //   }
    // }
  }

  setChemical2to1() {
    let chemical : Chemical = {
      name : this.item2[0].chemical.name,
      concentration : this.item2[0].chemical.concentration,
      unitConcentration : this.item2[0].chemical.unitConcentration ,
      state : this.item2[0].chemical.state,
      description : this.item2[0].chemical.description,
      id : this.item2[0].chemical.id,
      Ka : this.item2[0].chemical.Ka,
      Kb : this.item2[0].chemical.Kb,
      pH : this.item2[0].chemical.pH,
      solutionOf2 : this.item2[0].chemical.solutionOf2
    }

    let item : Item = {
      name: this.item1[0].name,
      id: this.item1[0].id,
      icon:this.item1[0].icon,
      unit:this.item1[0].unit,
      volMax:this.item1[0].volMax,
      vol : this.item1[0].vol,
      iconClass:this.item1[0].iconClass,
      data: !this.item1[0].data ? this.item1[0].data : null,
      chemical : chemical , 
    }
    this.item1[0] = item;
  }

  setChemical1to2() {
    let chemical : Chemical = {
      name : this.item1[0].chemical.name,
      concentration : this.item1[0].chemical.concentration,
      unitConcentration : this.item1[0].chemical.unitConcentration ,
      state : this.item1[0].chemical.state,
      description : this.item1[0].chemical.description,
      id : this.item1[0].chemical.id,
      Ka : this.item1[0].chemical.Ka,
      Kb : this.item1[0].chemical.Kb,
      pH : this.item1[0].chemical.pH,
      solutionOf2 : this.item1[0].chemical.solutionOf2
    }

    let item : Item = {
      name: this.item2[0].name,
      id: this.item2[0].id,
      icon:this.item2[0].icon,
      unit:this.item2[0].unit,
      volMax:this.item2[0].volMax,
      vol : this.item2[0].vol,
      iconClass:this.item2[0].iconClass,
      data: !this.item2[0].data ? this.item1[0].data : null,
      chemical : chemical , 
    }
    this.item2[0] = item;
  }

  setChemicalToNull(item: Item){
    item.chemical.name = null ;
    item.chemical.concentration = null ;
    item.chemical.unitConcentration = null ;
    item.chemical.state = null ;
    item.chemical.id = null ;
    item.chemical.Ka = null ;
    item.chemical.Kb = null ;
    item.chemical.pH = null ;
    item.chemical.solutionOf2 = null;
  }

  setDescription(pH : number, item : Item) {
    //Seteo description 
    if(!!pH){
      if(pH == 7){
        item.chemical.description = SOLUTION_DESCRIPTION.NEUTRA
      }else{
        if(pH > 7 && pH <= 14 ){
          item.chemical.description = SOLUTION_DESCRIPTION.BASICA
        }else{
          if(pH < 7 && pH >= 0 ){
            item.chemical.description = SOLUTION_DESCRIPTION.ACIDA;
            console.log(item.chemical.description);
            
          }
        }
      }
    }
  }

  getLogExtraDataSt(Item : Item,stInicio ?:string) : string {
    let st : string ;
    if( Item.vol > 0){
      let pH : string
      let concetracion :string;
      let volumen : string;
       Item.chemical.pH!=undefined &&  Item.chemical.pH!=null ? (pH = '  pH : '+  Item.chemical.pH) : '';
       Item.chemical.concentration!=undefined &&  Item.chemical.concentration!=null ? (concetracion = '  Concentración : '+  Item.chemical.concentration+' '+ Item.chemical.unitConcentration ): concetracion = '';
       (Item.id !=300 && !!Item.vol && !!Item.volMax ) ? volumen = ('  Volumen: ' +  Item.vol+'/'+ + Item.volMax + ' ' +  Item.unit) :  volumen = '';
      st  =(!!stInicio? stInicio: '')+'Contiene:  ' + Item.chemical.name +' '+ volumen +' '+concetracion+' '+pH ;
    }else{
      st = ''
    }
    return st ;
  }

  onClickSaveExperiment(){
    //CREATE
    if(this.firstSave){
      
       Swal.fire({
        title: 'Ingrese un título para el experimento',
        input: 'text',
        inputLabel: 'Título',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'El título no puede estar en blanco'
          }
        }
      }).then( data => {
        console.log(data);
        if(data.isConfirmed){
          let experiment : Experiment = {
            title : data.value,
            date : this.datePipe.transform(new Date(), 'HH:mm dd-MM-yyyy') ,
            logs : this.logService.getLogs()
          }
          //loading 
          this.savingExperiment = true;
          this.experimentDBService.create(experiment).then((dataa) => {
            Swal.fire({
              icon: 'success',
              title: 'Experimento guardado correctamente',
            })
            this.savingExperiment = false;
            console.log('Created new item successfully!');
            console.log(experiment);
            this.actualExperiment = experiment;
            this.firstSave = false;
          },err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error al guardarlo, intente nuevamente',
            })
            this.savingExperiment = false;
          })
        }
        
      })  
    }else{
      //UPDATE
      this.savingExperiment = true;
      let experiment : Experiment = {
        title : this.experimentDBService.getActualExperiment().title,
        date : this.datePipe.transform(new Date(), 'HH:mm dd-MM-yyyy'),
        logs : this.logService.getLogs()
      }
      this.experimentDBService.update(experiment).then((data) => {
        console.log('Update item successfully!');    
        this.experimentDBService.setActualExperiment(experiment);  
        this.actualExperiment = experiment;
        this.savingExperiment = false;
        Swal.fire({
          icon: 'success',
          title: 'Experimento guardado correctamente',
        })
      },err => {
        this.savingExperiment = false;
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al guardarlo, intente nuevamente',
        })
      })
    }
    
  }

}
