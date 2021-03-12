import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Item } from 'src/app/shared/models/item';
import {  MATRAZ_AFORADO_100 } from '../../../../core/enums/matraces/matraz-aforado-100';
import {  MATRAZ_AFORADO_250 } from '../../../../core/enums/matraces/matraz-aforado-250';
import {  MATRAZ_AFORADO_1000 } from '../../../../core/enums/matraces/matraz-aforado-1000';
import { AnimationItem } from 'lottie-web';
import { PROBETA_100 } from 'src/app/core/enums/probetas/probeta-100';
import { PROBETA_50 } from 'src/app/core/enums/probetas/probeta-50';
import { PROBETA_25 } from 'src/app/core/enums/probetas/probeta-25';
import { PROBETA_10 } from 'src/app/core/enums/probetas/probeta-10';
import { BURETA_10 } from 'src/app/core/enums/buretas/bureta-10';
import { BURETA_25 } from 'src/app/core/enums/buretas/bureta-25';
import { BURETA_50 } from 'src/app/core/enums/buretas/bureta-50';
import { VASO_DE_PRECIPITADOS_100 } from 'src/app/core/enums/vasos-de-precipitados/vaso-de-precipitados-100';
import { VASO_DE_PRECIPITADOS_250 } from 'src/app/core/enums/vasos-de-precipitados/vaso-de-precipitados-250';
import { VASO_DE_PRECIPITADOS_500 } from 'src/app/core/enums/vasos-de-precipitados/vaso-de-precipitados-500';
import { VASO_DE_PRECIPITADOS_1000 } from 'src/app/core/enums/vasos-de-precipitados/vaso-de-precipitados-1000';
import { PIPETA_5 } from 'src/app/core/enums/pipetas/pipeta-5';
import { PIPETA_10 } from 'src/app/core/enums/pipetas/pipeta-10';
import { PIPETA_25 } from 'src/app/core/enums/pipetas/pipeta-25';
import { ERLENMEYER_250 } from 'src/app/core/enums/erlenmeyers/erlenmeyer-250';
import { ERLENMEYER_500 } from 'src/app/core/enums/erlenmeyers/erlenmeyer-500';
import { ERLENMEYER_1000 } from 'src/app/core/enums/erlenmeyers/erlenmeyer-1000';
import { ACIDO_ACETICO } from 'src/app/core/enums/acidos/acido-acetico';
import { Chemical } from 'src/app/shared/models/chemical';
import { BORAX } from 'src/app/core/enums/bases/borax';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/microscope.json',
  };
  item1 : Item []= [];
  item2 : Item[]=  [];
  itemsOnTable : Item []=[] ;
  matrazAforado100 = MATRAZ_AFORADO_100;
  matrazAforado250 = MATRAZ_AFORADO_250;
  matrazAforado1000 = MATRAZ_AFORADO_1000;
  probeta10 = PROBETA_10;
  probeta25 = PROBETA_25;
  probeta50 = PROBETA_50;
  probeta100 = PROBETA_100;
  bureta10 = BURETA_10;
  bureta25 = BURETA_25;
  bureta50 = BURETA_50;
  vasoDePrecipitados100 = VASO_DE_PRECIPITADOS_100;
  vasoDePrecipitados250 = VASO_DE_PRECIPITADOS_250;
  vasoDePrecipitados500 = VASO_DE_PRECIPITADOS_500;
  vasoDePrecipitados1000 = VASO_DE_PRECIPITADOS_1000;
  pipeta5 = PIPETA_5;
  pipeta10 = PIPETA_10;
  pipeta25 = PIPETA_25;
  erlenmeyer250 = ERLENMEYER_250;
  erlenmeyer500 = ERLENMEYER_500;
  erlenmeyer1000 = ERLENMEYER_1000;
  acidoAcetico = ACIDO_ACETICO;
  acidoAceticoChemical : Chemical;
  baseBorax = BORAX;
  baseBoraxChemical : Chemical;

  constructor() { }
  
  
  ngOnInit(): void {
    this.setAcids();
    this.setBases();
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  setAcids(){
    this.acidoAceticoChemical = {
      name: this.acidoAcetico.chemicalName.toString(),
      unitConcentration: this.acidoAcetico.chemicalUnitConcentration.toString(),
      concentration: +(this.acidoAcetico.chemicalConcentration.toString()),
    }

  }

  setBases(){
    this.baseBoraxChemical = {
      name: this.baseBorax.chemicalName.toString(),
    }

  }

  dropItem1(event: CdkDragDrop<string[]>) {
    let item : Item = event.item.data;
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
    console.log(this.item1);
    console.log(this.item2);
    console.log(this.itemsOnTable);

  }

  dropItem2(event: CdkDragDrop<string[]>) {   
    let item : Item = event.item.data;
    let actualItem : Item = this.item2[0]; 
    console.log(event.item);
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
    console.log(this.item1);
    console.log(this.item2);
    console.log(this.itemsOnTable);
  }

  dropTable(e: CdkDragDrop<string[]>){
    console.log(e.item);
    if (e.previousContainer === e.container) {
      moveItemInArray(this.itemsOnTable, e.previousIndex, e.currentIndex);
    } else { 
      if (e.previousContainer.id == 'item1' || e.previousContainer.id == 'item2' ) {  
        transferArrayItem(e.previousContainer.data,
                          e.container.data,
                          e.previousIndex,
                          e.currentIndex);
      }else{
        this.itemsOnTable.push(e.item.data);
      }
    }
    console.log(this.item1);
    console.log(this.item2);
    console.log(this.itemsOnTable);
    
  }
  

}
