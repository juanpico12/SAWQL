import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GeneralService } from './core/services/general.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ConsoleToggleService } from './core/services/console-toogle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SAWQL';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore ,private generalService: GeneralService,overlayContainer: OverlayContainer,private consoleToggleService: ConsoleToggleService) {
    this.consoleToggleService.disableConsoleInProduction();
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
    this.generalService.addIcon('erlenmeyer-item', 'erlenmeyer.svg');
    this.generalService.addIcon('vasos-de-precipitados-item', 'vasos-de-precipitados-item.svg');
    this.generalService.addIcon('probeta-item', 'probeta-item.svg');
    this.generalService.addIcon('bureta-item', 'bureta-item.svg');
    this.generalService.addIcon('acidoFuerte-item', 'acidoFuerte-item.svg');
    this.generalService.addIcon('acidoDebil-item', 'acidoDebil-item.svg');
    this.generalService.addIcon('baseFuerte-item', 'baseFuerte-item.svg');
    this.generalService.addIcon('baseDebil-item', 'baseDebil-item.svg');
    this.generalService.addIcon('water-item', 'water-item.svg');
    this.generalService.addIcon('ph-meter-item', 'ph-meter-item.svg');
  }
  
}
