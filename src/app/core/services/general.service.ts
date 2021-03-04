import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
   providedIn: 'root',
})
export class GeneralService {
   private _message = new Subject<string>();
   public sideNavState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

   constructor(
      private dialogRef: MatDialog,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
   ) { }

   getMessage(): Observable<string> {
      return this._message.asObservable();
   }

   getNavStateValue(): boolean {
      return this.sideNavState$.getValue();
   }

   sendMessage(message: string) {
      this._message.next(message);
   }

   clearMessage() {
      this._message.next();
   }

   getDayName = (date: Date): string => {
      let day = '';
      switch (date.getDay()) {
         case 0:
            day = 'Domingo';
            break;
         case 1:
            day = 'Lunes';
            break;
         case 2:
            day = 'Martes';
            break;
         case 3:
            day = 'Miércoles';
            break;
         case 4:
            day = 'Jueves';
            break;
         case 5:
            day = 'Viernes';
            break;
         case 6:
            day = 'Sábado';
            break;
      }
      return day;
   };

   getRandomColor(): string {
      var color = Math.floor(0x1000000 * Math.random()).toString(16);
      return '#' + ('000000' + color).slice(-6);
   }

   addIcon(nameIcon: string, fileName: string) {


      this.matIconRegistry.addSvgIcon(
         nameIcon,
         this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/' + fileName)
      )
   }

   sanitizeUrl(url) {
      return this.domSanitizer.bypassSecurityTrustUrl(url);
   }

   getSummarizeString(str: string, maxLength: number): string {
      return !!str && str.toString().length > maxLength ?
         `${str.slice(0, maxLength - 3)}...`
         :
         str;
   }

   /**
    * This method is used as argument of the sort (array) function
    * @param propName Property name of the object
    * Example: arr.sort(by('height'));
    */
   public by(propName: string) {
      return function (a, b) {
         return a[propName] - b[propName];
      }
   }

   public normalizeString(str: string): string {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   }

   public closeAllDialogs() {
      this.dialogRef.closeAll();
   }

   public stringIsNumber(value: string): RegExpMatchArray {
      var numbers = /^[0-9]+$/;
      return value.match(numbers);
   }

   public getSubdomain(index = 0): string {
      const full = window.location.hostname;
      const parts = full.split('.');
      let subdomain;
      if (!!parts[index] && parts[index] != 'www') {
         subdomain = parts[index]
      } else {
         index += 1;
         if (!!parts[index]) {
            subdomain = parts[index]
         }
      }
      return subdomain || '';
   }

   static  cuilValidator(cuil: string): boolean {
      if (cuil.length !== 11) {
        return false;
      }
    
      const [checkDigit, ...rest] = cuil
        .split('')
        .map(Number)
        .reverse();
    
      const total = rest.reduce(
        (acc, cur, index) => acc + cur * (2 + (index % 6)),
        0,
      );
      console.log(rest);
      console.log(checkDigit);
      console.log(total);
      
      const mod11 = 11 - (total % 11);
    
      if (mod11 === 11) {
        return checkDigit === 0;
      }
    
      if (mod11 === 10) {
        return false;
      }
    
      return checkDigit === mod11;
    }
}
