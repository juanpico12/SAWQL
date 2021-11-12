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
    console.log(Item2);
    if(volAnt > 0 ){
      console.log('PASOOO');
      
      console.log(ItemNewPh.chemical.id);
      console.log(Item2.chemical.id);
      //ESTAMOS MEZCLANDO DOS SUSTANCIAS, RECALCULAMOS NOMBRE (Si no es la misma sustancia)
      if(ItemNewPh.id != Item2.id ){
        console.log('paso');
        
        ItemNewPh.chemical.name=  ItemNewPh.chemical.name +' + '+ Item2.chemical.name;
        //Ya tenemos dos soluciones 
        ItemNewPh.chemical.solutionOf2 =true ; 
        console.log(ItemNewPh.chemical.solutionOf2);
        
      }  
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
          console.log(ItemNewPh.chemical);
          
        }
        console.log(Fc);
        
        switch(solution.chemical.id) { 
          case this.SOLUTION_TYPES.ACIDO_FUERTE: { 
            console.log('entro aca papa');
            
              pH = - Math.log10(Fc) ;
             break; 
          } 
          case this.SOLUTION_TYPES.ACIDO_DEBIL: { 
              pH = - Math.log10( this.calculateQuadratic(1,solution.chemical.Ka,-(Fc*solution.chemical.Ka),null,Fc)) ;
             //statements; 
             break; 
          } 
          case this.SOLUTION_TYPES.BASE_DEBIL: { 
              pH =  - Math.log10(1e-14 /this.calculateQuadratic(1,solution.chemical.Ka,-(Fc*solution.chemical.Kb),null,Fc)) ; 
            break; 
          } 
          case this.SOLUTION_TYPES.BASE_FUERTE: { 
              pH =  - Math.log10(1e-14/Fc) ;
            break; 
          } 
          default: { 
             break; 
          } 
       }
      }else{
        
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
                //EN EL DESTINO TENEMOS ACIDO FUERTE Y AGREGAMOS ACIDO DEBIL
                //vid = vol  vif= volAnt 
                let Cnd : number = Item2.chemical.concentration * vol / (vol+volAnt);
                let Cnf : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
                pH = this.calculateAfvsAd(Cnf, Cnd ,Item2.chemical.Ka)
              }else{
                //BASE FUERTE vs BASE DEBIL
                if(Item2.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.BASE_DEBIL ){
                  //EN EL DESTINO TENEMOS BASE_DEBIL Y AGREGAMOS BASE_FUERTE
                  //vid = volAnt  vif= vol 
                  let Cnd : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
                  let Cnf : number = Item2.chemical.concentration * vol / (vol+volAnt);
                  pH = this.calculateBfvsBd(Cnf , Cnd , ItemNewPh.chemical.Kb)
                }else{
                  if(Item2.chemical.id == this.SOLUTION_TYPES.BASE_DEBIL && ItemNewPh.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE ){
                    //EN EL DESTINO TENEMOS BASE_FUERTE Y AGREGAMOS BASE_DEBIL
                    //vid = vol  vif= volAnt 
                    let Cnd : number = Item2.chemical.concentration * vol / (vol+volAnt);
                    let Cnf : number = ItemNewPh.chemical.concentration * volAnt / (vol+volAnt);
                    pH = this.calculateBfvsBd(Cnf, Cnd ,Item2.chemical.Kb)
                  }else{
                    //ACIDO FUERTE vs BASE DEBIL
                    if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.BASE_DEBIL ){
                      //EN EL DESTINO TENEMOS BASE_DEBIL Y AGREGAMOS ACIDO_FUERTE
                      let nH : number = Item2.chemical.concentration * vol;
                      let nOH : number = ItemNewPh.chemical.concentration * volAnt;
                      pH = this.calculateAfvsBd(nH, nOH , volAnt ,vol, ItemNewPh.chemical.Kb )
                    }else{
                      if(Item2.chemical.id == this.SOLUTION_TYPES.BASE_DEBIL && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_FUERTE ){
                        //EN EL DESTINO TENEMOS ACIDO FUERTE Y AGREGAMOS BASE DEBIL
                        let nH : number = ItemNewPh.chemical.concentration * volAnt;
                        let nOH : number = Item2.chemical.concentration * vol;
                        pH = this.calculateAfvsBd(nH, nOH ,volAnt ,vol,Item2.chemical.Kb )
                      }else{
                        //ACIDO DEBIL vs BASE FUERTE
                        if(Item2.chemical.id == this.SOLUTION_TYPES.ACIDO_DEBIL && ItemNewPh.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE ){
                          //EN EL DESTINO TENEMOS BASE FUERTE Y AGREGAMOS ACIDO DEBIL
                          let nH : number = Item2.chemical.concentration * vol;
                          let nOH : number = ItemNewPh.chemical.concentration * volAnt;
                          pH = this.calculateAdvsBf(nH, nOH , volAnt ,vol, Item2.chemical.Ka )

                        }else{
                          if(Item2.chemical.id == this.SOLUTION_TYPES.BASE_FUERTE && ItemNewPh.chemical.id == this.SOLUTION_TYPES.ACIDO_DEBIL ){
                            //EN EL DESTINO TENEMOS ACIDO_DEBIL Y AGREGAMOS BASE_FUERTE
                            let nH : number = ItemNewPh.chemical.concentration * volAnt;
                            let nOH : number = Item2.chemical.concentration * vol;
                            
                            pH = this.calculateAdvsBf(nH, nOH ,volAnt ,vol,ItemNewPh.chemical.Ka )
                          }else{
                            pH = Item2.chemical.pH
                          } 
                        }
                      }
                    }               
                  }
                }
               
              }
            }
          }
        }
      }
    } else{
      pH= Item2.chemical.pH;
    }
    return pH ;
  }

  calculateFc(InitialConcentration, InitialVol , FinalVol) : number{
    return (InitialConcentration * InitialVol) / FinalVol;
  }

  calculateQuadratic(a : number ,b : number ,c : number ,p1 ?: number  ,p2 ?: number) : number{
    let disc;
    disc=(b*b)-(4*a*c); 
    console.log(disc);
    console.log(a);
    console.log(b);
    console.log(c);
    let x1 : number =  (-b+Math.sqrt(disc))/(2*a);
    let x2 : number =  (-b-Math.sqrt(disc))/(2*a);
    console.log(x1+ ' ' + x2);
    if(!!p1 && ((p1 + x1) > 0) && ((p2 - x1) > 0) ){
      return x1
    }else{
      if(!!p1 && ((p1 + x2) > 0) && ((p2 - x2) > 0) ){
        return x2
      }else{
        return x1 > x2 ? x1 : x2 ;
      }
     
    }
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

  calculateAfvsBd(nH : number, nOH:number , vol1  : number , vol2 : number ,ka : number) : number {
    //vol 1 -> volumen anterior
    //vol 2 -> volumen a verter
    let result : number = nH - nOH ;
    let pH : number;
    let vf : number  = vol1 + vol2 ;
    const kw : number = 1e-14;
    let kb : number = kw/ka;
    console.log(result);
    
    if(result == 0) {
      let csi :number = nH/vf;
      
      pH = -Math.log10(this.calculateQuadratic(1,ka,-(ka*csi),null,csi))
    }else{
      //nH > nOH
      if(result >0){
        let H = result/vf
        pH =  -(Math.log10(H))
      }
      //nH < nOH
      else{
        let cbe : number = (nOH - nH)/vf
        let csal : number = (nH/vf);
        let x : number = this.calculateQuadratic(1,(csal+kb),-(kb*cbe),csal,cbe);
        pH =  -Math.log10(1e-14/x)
      }
    }
    return pH
  }

  calculateAdvsBf(nH : number, nOH:number , vol1  : number , vol2 : number ,ka : number) : number {
    let result : number = nH - nOH ;
    let pH : number;
    let vf : number  = vol1 + vol2 ;
    const kw : number = 1e-14;
    let kb : number = kw/ka;
    console.log(result);
    
    if(result == 0) {
      let csi :number = nH/vf;
      console.log(kb);
      console.log(this.calculateQuadratic(1,kb,-(kb*csi),null,csi));
      let pOH= - Math.log10(this.calculateQuadratic(1,kb,-(kb*csi),null,csi))
      pH =14 -  pOH
    }else{
      //nH < nOH
      if(result <0){
        let OH = (nOH-nH)/vf;
        let pOH=-(Math.log10(OH))
        pH = 14 - pOH;
      }
      //nH > nOH
      else{
        console.log('paso');

        
        let cae : number = (nH - nOH)/vf
        let csal : number = (nOH/vf);
        let x : number = this.calculateQuadratic(1,(csal+ka),-(ka*cae),csal,cae);
        console.log(cae);
        console.log(csal);
        console.log(x);
        
        pH = - Math.log10(x)
      }
    }
    return pH
  }

  

  calculateAfvsAd(cnf ,cnd , ka): number {
    let x : number = this.calculateQuadratic(1,(cnf+ka),-(cnd*ka),cnf,cnd);
    return  -Math.log10(cnf+x)
  }

  calculateBfvsBd(cnf,cnd,kb) : number {
    let x : number = this.calculateQuadratic(1,(cnf+kb),-(cnd*kb),cnf,cnd);
    return  -Math.log10(1e-14/(cnf+x))
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
      solutionOf2 : item2.chemical.solutionOf2,
    }

    return chemical

  }
}
