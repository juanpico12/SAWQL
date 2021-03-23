import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Item } from 'src/app/shared/models/item';
import { AnimationItem } from 'lottie-web';
import { SimDataService } from 'src/app/core/services/sim-data.service';
import { Observable, of, from, Subscription } from 'rxjs';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/microscope.json',
  };
  value;
  item1 : Item []= [];
  item2 : Item[]=  [];
  itemsOnTable : Item []=[] ;
  data :any[] ;
  acidos :Item[];
  bases : Item[];
  matraces : Item[];
  buretas : Item[];
  pipetas : Item[];
  probetas : Item[];
  vasoDePrecipitados : Item[];
  erlenmeyers : Item[];
  constructor(public SimDataService : SimDataService) { }
  
  
  ngOnInit(): void {
    this.SimDataService.getItems().subscribe((data) => this.data = data)
    this.setData();
  }

  setData(){
    this.data.forEach((itemArray : any) => {

      switch(Object.keys(itemArray)[0]) { 
        case 'acidos': { 
           this.acidos= itemArray.acidos;
           break; 
        } 
        case 'matraces': { 
          this.matraces= itemArray.matraces;
           break; 
        } 
        case 'bases': { 
          this.bases= itemArray.bases;
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

  onChangeWithdrawSlider(e){
    console.log(e.value);
    
  }
  

}
