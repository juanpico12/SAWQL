export interface Chemical {
    id: number;
    name : string;
    unitConcentration ?: string;
    concentration?: number;
    state?: string,
    description? : string,
    pH? : number,
    Ka? : number;
    Kb?:number;
    solutionOf2 ?: boolean;
 }