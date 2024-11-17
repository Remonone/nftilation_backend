import { UserRole } from "./userRole";

export interface PlayerCredentials {
    login: string;
    password: string;
}

export interface PlayerRegister {
    login: string;
    teamName: string;
    role: UserRole;
}