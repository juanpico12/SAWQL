import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,ChangeDetectorRef } from '@angular/core';

import { Chemical } from 'src/app/shared/models/chemical';

@Component({
  selector: 'app-sim-item',
  templateUrl: './sim-item.component.html',
  styleUrls: ['./sim-item.component.scss']
})
export class SimItemComponent implements OnInit,OnChanges {
  @Input() icon: string;
  @Input() iconSvg: string;
  @Input() iconClass: string;
  @Input() iconSvgClass: string;
  @Input() class: string;
  @Input() name: string;
  @Input() id: number;
  @Input() volMax: number;
  @Input() vol: number;
  @Input() showVol: boolean =true;
  @Input() unit: number;
  @Input() chemical: Chemical;
  @Input() chemicalName: string;
  @Input() chemicalConcentration: number;
  @Input() chemicalUnitConcentration: string;
  @Input() delete: boolean =false;
  @Output() onClickDeleteEvent = new EventEmitter();
  showDelete : boolean = false;
  tooltipData : string;
  volumeString : string;
  concentracionString : string;
  chemicalNameString : string = null;
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.setVolumeAndConcetracionString();
    console.log(this.id);
    
    console.log(this.chemicalConcentration);
    console.log(changes);
    if(!!changes.chemicalConcentration?.currentValue && changes.chemicalConcentration.currentValue != changes.chemicalConcentration.previousValue){
      console.log(this.chemicalConcentration);
      this.changeDetectorRef.detectChanges();
    }
    
    
  }

  onClickDelete(e){
    this.onClickDeleteEvent.emit(e);
  }

  setVolumeAndConcetracionString(){
    if(!!this.chemicalName){
      this.chemicalNameString = this.chemicalName + ' ';
    }else{
      this.chemicalNameString = '';
    }
    if(!!this.volMax ){
      if( !!this.chemicalConcentration && !!this.chemicalUnitConcentration){
        this.concentracionString = (this.chemicalConcentration.toString.length > 2 ?  this.chemicalConcentration.toFixed(3) : this.chemicalConcentration )+ ' ' + this.chemicalUnitConcentration
      }else{
        console.log('entro');
        
        this.concentracionString =''
      }
      //its a matraz
      if(this.id == 10 ){
        this.volumeString = this.vol+'/'+ +this.volMax + ' ' + this.unit;
        this.tooltipData = 'Nombre: '+ this.name + ' \n Volumen: '+this.volumeString  +' \n ';
      }else{
        //its water. We dont show the vol
        if(this.id == 300 ){
          this.volumeString = '';
          this.tooltipData = 'Nombre: '+ this.name +' \n'    ;
        }else{
          this.volumeString = this.vol+'/'+ +this.volMax + ' ' + this.unit;
          this.tooltipData = 'Nombre: '+ this.name + ' \n Volumen: '+this.volumeString  +' \n ';
        }
      }
      
    }else{
      this.tooltipData = 'Nombre: '+ this.name +' \n'    ;
    }
    if(!!this.chemicalConcentration && !!this.chemicalUnitConcentration){
      this.tooltipData =this.tooltipData + ' Concentración: '+ this.chemicalConcentration+' ' + this.chemicalUnitConcentration;
      console.log(this.tooltipData);
      
    }
  }

  getActualVolume(): number{
    return this.vol;
  }

  setVolume(number : number){
    this.vol = number;
  }

  getVolMax():number {
    return this.volMax;
  }

}
