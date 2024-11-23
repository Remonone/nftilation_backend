import { UserRole } from "./userRole";

export interface PlayerCredentials {
    login: string;
    password: string;
}

export interface PlayerRegister {
    login: string;
    password: string;
    teamName: string;
    role: UserRole;
}