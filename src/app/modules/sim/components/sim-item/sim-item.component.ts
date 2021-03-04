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
  @Input() name: string;
  @Input() id: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.iconSvgClass);
    
  }

}
