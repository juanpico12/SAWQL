import { Injectable } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { SOLUTION_TYPES } from 'src/app/core/enums/solution-type';
import { SOLUTION_DESCRIPTION } from 'src/app/core/enums/solution-description';
import { Chemical } from 'src/app/shared/models/chemical';
@Injectable({
  providedIn: 'root'
})
export class SimPhService {
  SOLUTION_TYPES = SOLUTION_TYPES;
  SOLUTION_DESCRIPTION = SOLUTION_DESCRIPTION;
  constructor() { }

  calculatePh(ItemNewPh : Item , Item2 : Item, vol : number)  : number{
    //check if there are vol > 0
    let Fc;
    let pH  : number;
    let volAnt : number = ItemNewPh.vol - vol ;
    console.log(ItemNewPh);
    if(volAnt > 0 ){
      //Estoy agregando agua vs acf, acd, bf,bd || acf, acd, bf,bd vs agua
      if(Item2.id == 300 || ItemNewPh.chemical.id== this.SOLUTION_TYPES.AGUA){
        let water : Item;
        let solution : Item;
        //El volumen en el recipiente destino es el final porque ya lo agregamos
        //Estoy agregando agua vs acf, acd, bf,bd
        if(Item2.id == 300){
          water=Item2;
          solution= ItemNewPh;
          Fc=  this.calculateFc(solution.chemical.concentration,(solution.vol - vol) , solution.vol);
          //Asigno nueva concentracion
          ItemNewPh.chemical.concentration = Fc;
        }else{
          //Estoy agregando acf, acd, bf,bd vs agua 
          water= ItemNewPh;
          solution =Item2;
          Fc=  this.calculateFc(solution.chemical.concentration, vol , water.vol);
          //Asigno nueva concentracion y chemical general para que no quede el del H20
          ItemNewPh.chemical = this.setChemical1to2(Item2 ,ItemNewPh ,Fc)
        }
        console.log(Fc);
        
        switch(solution.chemical.id) { 
          case this.SOLUTION_TYPES.ACIDO_FUERTE: { 
            console.log('entro aca papa');
            
              pH = - Math.log10(Fc) ;
             break; 
          } 
          case this.SOLUTION_TYPES.ACIDO_DEBIL: { 
              pH = - Math.log10( this.calculateQuadratic(1,solution.chemical.Ka,(Fc*solution.chemical.Ka))) ;
             //statements; 
             break; 
          } 
          case this.SOLUTION_TYPES.BASE_DEBIL: { 
            pH =  - Math.log10(1e-14/Fc) ;
            break; 
          } 
          case this.SOLUTION_TYPES.BASE_FUERTE: { 
              pH =  - Math.log10(1e-14 /this.calculateQuadratic(1,solution.chemical.Ka,(Fc*solution.chemical.Kb))) ; 
            break; 
          } 
          default: { 
             break; 
          } 
       }
      }else{
        //ESTAMOS MEZCLANDO DOS SUSTANCIAS, RECALCULAMOS NOMBRE (Si no es la misma sustancia)
        if(ItemNewPh.chemical.id != Item2.chemical.id ){
          ItemNewPh.chemical.name=  ItemNewPh.chemical.name +' + '+ Item2.chemical.name;
          //Ya tenemos dos soluciones 
          ItemNewPh.chemical.solutionOf2 =true ; 
        }  
        // BASE FUERTE vs ACIDO FUERTE
        if(Item2.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE ){
          //EN EL DESTINO TENEMOS ACIDO FUERTE Y AGREGAMOS BASE FUERTE
          let nH : number = ItemNewPh.chemical.concentration * volAnt;
          let nOH : number = Item2.chemical.concentration * vol;
          pH = this.calculateAfvsBf(nH, nOH , volAnt ,vol )
        }else{
          if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE ){
            //EN EL DESTINO TENEMOS BASE FUERTE Y AGREGAMOS ACIDO FUERTE
            let nH : number = Item2.chemical.concentration * vol;
            let nOH : number = ItemNewPh.chemical.concentration * volAnt;
            pH = this.calculateAfvsBf(nH, nOH ,volAnt ,vol )
          }else{
            //ACIDO FUERTE vs ACIDO DEBIL
            if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_DEBIL ){
              //EN EL DESTINO TENEMOS ACIDO_DEBIL Y AGREGAMOS ACIDO FUERTE
              //vid = volAnt  vif= vol 
              let Cnd : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
              let Cnf : number = Item2.chemical.concentration * vol / (vol+volAnt);
              pH = this.calculateAfvsAd(Cnf, Cnd ,ItemNewPh.chemical.Ka)
            }else{
              if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_DEBIL && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE ){
                //EN EL DESTINO TENEMOS FUERTE Y AGREGAMOS ACIDO DEBIL
                //vid = vol  vif= volAnt 
                let Cnd : number = Item2.chemical.concentration * vol / (vol+volAnt);
                let Cnf : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
                pH = this.calculateAfvsAd(Cnf, Cnd ,Item2.chemical.Ka)
              }else{
                pH = Item2.chemical.pH
              }
            }
          }
        }
      }
    }else{
      pH= Item2.chemical.pH;
    }
    return pH ;
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

  calculateAfvsBf(nH : number, nOH:number , vol1  : number , vol2 : number) : number {
    let result : number = nH - nOH ;
    let pH : number;
    //nH = nOH
    console.log(result);
    
    if(result == 0) {
      pH = 7
    }else{
      //nH > nOH
      if(result >0){
        pH =  -Math.log10(result/(vol1 + vol2))
      }
      //nH < nOH
      else{
        pH =  -Math.log10(1e-14/((result*-1)/(vol1 + vol2)))
      }
    }
    return pH
  }

  calculateAfvsAd(cnf ,cnd , ka): number {
    let x : number = this.calculateQuadratic(-1,(cnf+ka),-(cnd*ka));
    return  -Math.log10(cnf+x)
  }

  setChemical1to2(item1 : Item , item2 : Item ,Fc :number) : Chemical {
    let chemical : Chemical = {
      name : item1.chemical.name,
      concentration : Fc,
      unitConcentration : item1.chemical.unitConcentration ,
      state : item1.chemical.state,
      description :  item1.chemical.description,
      id :  item1.chemical.id,
      Ka :  item1.chemical.Ka,
      Kb :  item1.chemical.Kb,
      pH :  item1.chemical.pH,
    }

    return chemical

  }
}
