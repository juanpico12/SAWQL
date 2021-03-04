import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PIPETA } from 'src/app/core/enums/pipeta';
import { MATRAZ_AFORADO } from '../../../../core/enums/matraz-aforado';
@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent implements OnInit {
  matrazAforado = MATRAZ_AFORADO;
  pipeta= PIPETA;
  constructor() { }
  item1 = null;
  
  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    this.item1 = event.item.data
  }
  

}
