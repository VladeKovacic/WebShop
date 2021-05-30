import { Role } from "../auth/role";

export interface NavigationModel {
    label: string;
    routerLink: string;
    role: Role;
    icon?: string;
}