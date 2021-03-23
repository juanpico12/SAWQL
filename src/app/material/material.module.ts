import { NgModule } from '@angular/core';
// import { Md2Module } from 'md2';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
//import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatStepperModule } from '@angular/material/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';



const material = [
   MatButtonModule,
   MatCardModule,
   MatNativeDateModule,
   MatTabsModule,
   MatSelectModule,
   MatDividerModule,
   MatInputModule,
   MatIconModule,
   MatFormFieldModule,
   ReactiveFormsModule,
   MatDatepickerModule,
   MatToolbarModule,
   MatSidenavModule,
   MatRadioModule,
   MatCheckboxModule,
   MatMenuModule,
   MatListModule,
   //MatTableModule,
   MatTooltipModule,
   MatBottomSheetModule,
   MatExpansionModule,
   MatBadgeModule,
   MatSortModule,
   MatPaginatorModule,
   MatSnackBarModule,
   MatButtonToggleModule,
   MatDialogModule,
   MatProgressSpinnerModule,
  // MatChipsModule,
   MatAutocompleteModule,
   // NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule,
   // MatCarouselModule,
   MatStepperModule,
   DragDropModule,
   MatProgressBarModule,
   MatSliderModule
];

// const md2 = [Md2Module]

const flexLayout = [FlexLayoutModule];

@NgModule({
   imports: [material, flexLayout],
   exports: [material, flexLayout],
})
export class MaterialModule { }
