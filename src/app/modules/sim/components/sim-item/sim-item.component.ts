import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sim-item',
  templateUrl: './sim-item.component.html',
  styleUrls: ['./sim-item.component.scss']
})
export class SimItemComponent implements OnInit {
  @Input() icon: string;
  @Input() iconSvg: string;
  @Input() iconClass: string;
  @Input() iconSvgClass: string;
  @Input() class: string;
  @Input() name: string;
  @Input() id: number;
  tooltipData : string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.iconSvgClass);

    
    this.tooltipData = 'Nombre: '+ this.name +'\n   Id: '+ this.id + ' \n Volumen: 50/100 ml \n ';

  }

}
