import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() unit: number;
  @Input() chemical: Chemical;
  tooltipData : string;
  volumeString : string;
  chemicalNameString : string = null;
  constructor() { }

  ngOnInit(): void {
    console.log(this.chemical);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.setVolumeString();
  }

  setVolumeString(){
    if(!!this.chemical?.name){
      this.chemicalNameString = this.chemical.name + ' ';
    }
    this.volumeString = this.vol+'/'+ +this.volMax + ' ' + this.unit;
    this.tooltipData = 'Nombre: '+ this.name +'\n   Id: '+ this.id + ' \n Volumen: '+this.volumeString  +' \n ';
    if(!!this.chemical?.concentration){
      this.tooltipData =this.tooltipData + ' Concentración: '+ this.chemical.concentration +' ' + this.chemical.unitConcentration;
    }
  }

}
