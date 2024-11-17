import { UserRole } from "../types/userRole";
import TeamData from "./team";

export interface User {
    login: string; // nickname
    password: string;
    team: TeamData;
    role: UserRole;
}

export interface PlayerData {
    login: string;
    team: TeamData;
    role: UserRole;
}