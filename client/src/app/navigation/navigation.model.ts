import { Role } from "./role";

export interface NavigationModel {
    label: string;
    routerLink: string;
    role: Role;
    icon?: string;
}