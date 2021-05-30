import { Action } from "@ngrx/store";
import { User } from "../_models/user";

export const SET_AUTHENTICATED = '[Auth] Set authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set unauthenticated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;

    constructor(public payload: User) {}
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;