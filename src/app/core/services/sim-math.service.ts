import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimMathService {

  constructor() { }

  canPour(volFrom, volTo, volMaxTo , quantity) : boolean {
    if( quantity > volFrom || (quantity + volTo > volMaxTo)){
      return false;
    }else{
      return true;
    }
  }

  canWithdraw(volTo, volFrom, volMaxFrom , quantity) : boolean {
    if( quantity > volTo || (quantity + volFrom > volMaxFrom)){
      return false;
    }else{
      return true;
    }
  }
}
