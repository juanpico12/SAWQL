import { from } from "rxjs";
import {Chemical} from './chemical'
export interface Item {
    name: string;
    id: number;
    icon:string;
    unit?:string;
    volMax?:number;
    vol ?: number;
    iconClass:string;
    data?: any;
    chemical? : Chemical;
 }