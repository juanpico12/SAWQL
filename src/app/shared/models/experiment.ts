import { Log } from "./log";

export interface Experiment{
    key? : string;
    title : string;
    date : string;
    logs : Log[];
}