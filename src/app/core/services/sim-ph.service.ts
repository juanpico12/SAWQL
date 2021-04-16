import { Injectable } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { SOLUTION_TYPES } from 'src/app/core/enums/solution-type';

@Injectable({
  providedIn: 'root'
})
export class SimPhService {
  SOLUTION_TYPES = SOLUTION_TYPES;
  constructor() { }

  calculatePh(ItemNewPh : Item , Item2 : Item, vol : number)  : string{
    //check if there are vol > 0
    let Fc;
    let pH  : string;
    let volAnt : number = ItemNewPh.vol - vol ;
    console.log(ItemNewPh);
    //El destino estaba vacio , va a tener el pH del recipiente origen
    if(volAnt ==0){
      return Item2.chemical.pH;
    }
    if(ItemNewPh.vol > 0 ){
      //Estoy agregando agua vs acf, acd, bf,bd
      if(Item2.id == 300){
        //El volumen en el recipiente destino es el final porque ya lo agregamos
        Fc=  this.calculateFc(ItemNewPh.chemical.concentration,volAnt , ItemNewPh.vol);
        switch(ItemNewPh.chemical.id) { 
          case this.SOLUTION_TYPES.ACIDO_FUERTE: { 
              pH ='Ph : '+  - Math.log10(Fc) ;
             break; 
          } 
          case this.SOLUTION_TYPES.ACIDO_DEBIL: { 
              console.log('entrooafwa');
              console.log(- Math.log10( this.calculateQuadratic(1,ItemNewPh.chemical.Ka,(Fc*ItemNewPh.chemical.Ka))));
              
              pH ='Ph : '+  - Math.log10( this.calculateQuadratic(1,ItemNewPh.chemical.Ka,(Fc*ItemNewPh.chemical.Ka))) ;
             //statements; 
             break; 
          } 
          case this.SOLUTION_TYPES.BASE_DEBIL: { 
            pH ='Ph : '+  - Math.log10(1e-14/Fc) ;
            break; 
          } 
          case this.SOLUTION_TYPES.BASE_FUERTE: { 
              pH ='Ph : '+  - Math.log10(1e-14 /this.calculateQuadratic(1,ItemNewPh.chemical.Ka,(Fc*ItemNewPh.chemical.Kb))) ; 
            break; 
          } 
          default: { 
             break; 
          } 
       }
       return pH ;
      }else{
        // BASE FUERTE vs ACIDO FUERTE
        if(Item2.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE ){
          //EN EL DESTINO TENEMOS ACIDO FUERTE Y AGREGAMOS BASE FUERTE
          
          let nH : number = ItemNewPh.chemical.concentration * volAnt;
          let nOH : number = Item2.chemical.concentration * vol;
          console.log(' ENTRO nH : '+ nH + 'NOH : '+ nOH + 'vol: '+ volAnt +' ' + vol);
          return this.calculateAfvsBf(nH, nOH , volAnt ,vol )
        }else{
          if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE ){
            //EN EL DESTINO TENEMOS BASE FUERTE Y AGREGAMOS ACIDO FUERTE
            let nH : number = Item2.chemical.concentration * vol;
            let nOH : number = ItemNewPh.chemical.concentration * volAnt;
            return this.calculateAfvsBf(nH, nOH ,volAnt ,vol )
          }else{
            //ACIDO FUERTE vs ACIDO DEBIL
            if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_DEBIL ){
             
              
              //EN EL DESTINO TENEMOS ACIDO_DEBIL Y AGREGAMOS ACIDO FUERTE
              //vid = volAnt  vif= vol 
              let Cnd : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
              let Cnf : number = Item2.chemical.concentration * vol / (vol+volAnt);
              console.log('ACIDO DEBIL RECIBE FUERTE'+Cnd+' '+Cnf+' '+ItemNewPh.chemical.Ka );
              return this.calculateAfvsAd(Cnf, Cnd ,ItemNewPh.chemical.Ka)
            }else{
              if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_DEBIL && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE ){
                console.log('ACIDO FUERTE RECIBE DEBIL');
                //EN EL DESTINO TENEMOS FUERTE Y AGREGAMOS ACIDO DEBIL
                //vid = vol  vif= volAnt 
                let Cnd : number = Item2.chemical.concentration * vol / (vol+volAnt);
                let Cnf : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
                return this.calculateAfvsAd(Cnf, Cnd ,Item2.chemical.Ka)
              }
            }
          }
        }
      }
    }else{
      return 'pH inválido (el recipiente no tiene volumen)'
    }
  }

  calculateFc(InitialConcentration, InitialVol , FinalVol) : number{
    return (InitialConcentration * InitialVol) / FinalVol;
  }

  calculateQuadratic(a : number ,b : number ,c : number ) : number{
    let disc;
    disc=(b*b)-(4*a*c); 
    console.log(disc);
    console.log(a);
    console.log(b);
    console.log(c);
    let x1 : number =  (-b+Math.sqrt(disc))/(2*a);
    let x2 : number =  (-b-Math.sqrt(disc))/(2*a);
    console.log(x1+ ' ' + x2);
    
    return x1 > x2 ? x1 : x2 ;
  }

  calculateAfvsBf(nH : number, nOH:number , vol1  : number , vol2 : number) : string {
    let result : number = nH - nOH ;
    let pH : string;
    //nH = nOH
    console.log(result);
    
    if(result == 0) {
      pH = 'Ph : 7'
    }else{
      //nH > nOH
      if(result >0){
        pH = 'Ph : '+ -Math.log10(result/(vol1 + vol2))
      }
      //nH < nOH
      else{
        pH = 'Ph : '+ -Math.log10(1e-14/((result*-1)/(vol1 + vol2)))
      }
    }
    return pH
  }

  calculateAfvsAd(cnf ,cnd , ka): string {
    let x : number = this.calculateQuadratic(-1,(cnf+ka),-(cnd*ka));
    console.log(x);
    
    return 'Ph : '+ -Math.log10(cnf+x)
  }
}
