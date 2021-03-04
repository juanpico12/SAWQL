import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {

   static required(message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         return control && !control.value
            ? {
               required: message,
            }
            : null;
      };
   }

   static number(message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         return control && !/^\d+$/.test(control.value)
            ? {
               number: message,
            }
            : null;
      };
   }

   static minLength(minLength: number, message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         if (typeof control.value !== 'number') {
            return control && control.value && control.value.trim().length < minLength
               ? {
                  minLength: message,
               }
               : null;
         } else {
            return control && control.value && control.value.toString().length < minLength
               ? {
                  minLength: message,
               }
               : null;
         }
      };
   }

   static minValue(minValue: number, message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         if (typeof control.value !== 'number') {
            return {
               minValue: message,
            }
         } else {
            return control && control.value && control.value < minValue
               ? {
                  minValue: message,
               }
               : null;
         }
      };
   }

   static maxLength(maxLength: number, message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         if (typeof control.value !== 'number') {
            return control && control.value.trim().length > maxLength
               ? {
                  maxLength: message,
               }
               : null;
         } else {
            return control && control.value.toString().length > maxLength
               ? {
                  maxLength: message,
               }
               : null;
         }
      };
   }

   static email(message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         return control && !!control.value &&
            !(new RegExp(
               // tslint:disable-next-line: max-line-length
               /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ).test(control.value.trim()))
            ? {
               email: message,
            }
            : null
      };
   }


   static password(message: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         return control &&
            new RegExp(/^^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*().,_]).*$/, 'i').test(
               control.value.trim(),
            )
            ? null
            : {
               password: message,
            };
      };
   }

   static phoneNumberInvalidValidator(
      prefixName: string,
      suffixName: string,
      message: string,
   ): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         const prefix = control.get(prefixName);
         const suffix = control.get(suffixName);

         return prefix && suffix && prefix.value.trim().length + suffix.value.trim().length !== 10
            ? {
               phoneNumberInvalid: message,
            }
            : null;
      };
   }
   static CVFromToDate(
      message: string,
      errName,
      fromName: string,
      toName: string
   ): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         const fromCtrl = control.get(fromName);
         const toCtrl = control.get(toName);
         return fromCtrl && toCtrl && !!fromCtrl.value && !!toCtrl.value && (new Date(toCtrl.value) <= new Date(fromCtrl.value))
            ? {
               [errName]: message,
            }
            : null;
      };
   }

   static requiredDependingOnControlValue(
      message: string,
      errName,
      requiredName: string,
      dependentName: string,
      dependentValue: any
   ): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
         const requiredCtrl = control.get(requiredName);
         const dependentCtrl = control.get(dependentName);
         return requiredCtrl && dependentCtrl && !requiredCtrl.value && !!dependentCtrl.value && dependentCtrl.value == dependentValue
            ? {
               [errName]: message,
            }
            : null;
      };
   }

   static minValueValidator(minValue: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
          const valid = control.value >= minValue;
          return valid ? null : { 
              'minValue': { 
                  'minimum': minValue, 
                  'entered': control.value 
              } 
          };
      };
  }

   

   //Cross Validators

}
