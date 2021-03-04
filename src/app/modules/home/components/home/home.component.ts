
import { CdkDragDrop, DragDrop, DragRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModule } from 'src/app/modules/login/login.module';
import { Position } from 'src/app/shared/models/position';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  constructor(private authService: AuthService) { }
  elementsInTable = ['']

  ngOnInit(): void {
    
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
  }


}
