import { Experiment } from "./experiment";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    experiments? : Experiment[];
 }