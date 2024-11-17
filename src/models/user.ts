import { UserRole } from "../types/userRole";
import TeamData from "./team";

export interface User {
    login: string; // nickname
    password: string;
    teamName: string;
    role: UserRole;
}

export interface PlayerData {
    login: string;
    team: TeamData;
    role: UserRole;
}