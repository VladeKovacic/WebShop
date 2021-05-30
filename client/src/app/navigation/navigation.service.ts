import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { NavigationModel } from "./navigation.model";
import { Role } from "../auth/role";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private readonly navigation: NavigationModel[] = [
        {
            label: 'Sale',
            role: Role.NO_ROLE,
            routerLink: '/sale'
        },
        {
            label: 'Shop',
            role: Role.NO_ROLE,
            routerLink: '/shop'
        },
        {
            label: 'About',
            role: Role.NO_ROLE,
            routerLink: '/about'
        },
        {
            label: 'Signup',
            role: Role.ONLY_ANONYMOUS,
            routerLink: '/signup',
            icon: 'face'
        },
        {
            label: 'Login',
            role: Role.ONLY_ANONYMOUS,
            routerLink: '/login',
            icon: 'input'
        },
        {
            label: 'Product administration',
            role: Role.MODERATOR,
            routerLink: '/product-administration'
        }
    ]

    constructor() { }

    getNavigation() {
        return of([...this.navigation]);
    }
}