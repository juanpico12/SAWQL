export interface Chemical {
    id: number;
    name : string;
    unitConcentration ?: string;
    concentration?: number;
    state?: string,
    description? : string,
    pH? : string,
    Ka? : number;
    Kb:number;
 }