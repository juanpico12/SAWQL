import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GeneralService } from './core/services/general.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SAWQL';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore ,private generalService: GeneralService,overlayContainer: OverlayContainer,) {
    this.items = firestore.collection('items').valueChanges();
    overlayContainer.getContainerElement().classList.add('sawql-theme');
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addIcons();
    
  }

  addIcons(){
    this.generalService.addIcon('google', 'google.svg');
    this.generalService.addIcon('chemTools', 'chemTools.svg');
    this.generalService.addIcon('matraz', 'matraz.svg');
    this.generalService.addIcon('tabla-periodica', 'tabla-periodica.svg');
    this.generalService.addIcon('matraz-aforado-item', 'matraz-aforado-item.svg');
    this.generalService.addIcon('pipeta-item', 'pipeta-item.svg');
  }
}
