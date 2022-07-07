
import { CdkDragDrop, DragDrop, DragRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogService } from 'src/app/core/services/log.service';
import { LoginModule } from 'src/app/modules/login/login.module';
import { Position } from 'src/app/shared/models/position';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  hideIframe : boolean =true;
  constructor(private authService: AuthService,private logService: LogService, private _sanitizer: DomSanitizer) { }
  elementsInTable = ['']

  ngOnInit(): void {

  }
  


  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
  }

  onClickNewExperiment(){
    this.logService.newLogs();
  }

  getVideoIframe(url) {
    var video, results;
    console.log('pasoooo')
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + video);   
}



}
