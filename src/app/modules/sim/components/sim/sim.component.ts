import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { PIPETA } from 'src/app/core/enums/pipeta';
import { Item } from 'src/app/shared/models/item';
import { MATRAZ_AFORADO } from '../../../../core/enums/matraz-aforado';
import { AnimationItem } from 'lottie-web';
import { ERLENMEYER } from 'src/app/core/enums/erlenmeyer';
import { VASO_DE_PRECIPITADOS } from 'src/app/core/enums/vaso-de-precipitados';
import { PROBETA } from 'src/app/core/enums/probeta';
import { BURETA } from 'src/app/core/enums/bureta';
@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/microscope.json',
  };
  probeta = PROBETA;
  bureta = BURETA;
  matrazAforado = MATRAZ_AFORADO;
  vasoDePrecipitados = VASO_DE_PRECIPITADOS;
  pipeta= PIPETA;
  erlenmeyer = ERLENMEYER;
  item1 : Item []= [];
  item2 : Item[]=  [];
  itemsOnTable : Item []=[] ;
  constructor() { }
  
  
  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  dropItem1(event: CdkDragDrop<string[]>) {
    let item : Item = event.item.data;
    let actualItem : Item = this.item1[0]; 
    console.log(event.item);
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
