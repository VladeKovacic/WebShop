import { Action } from "@ngrx/store";
import { START_LOADING, STOP_LOADING } from "./ui.actions";

export interface State {
    isLoading: boolean;
    count: number;
}

const initialState: State = {
    isLoading: false,
    count: 0
};

export function uiReducer(state = initialState, action: Action) {
    // console.group('LOADING')
    // console.log(state);
    // console.log(action);
    // console.groupEnd();
    switch(action.type) {
        case START_LOADING:
            return {
                isLoading: true,
                count: state.count + 1
            };
        case STOP_LOADING:
            return {
                isLoading: state.count - 1 > 0,
                count: state.count - 1 >= 0 ? state.count - 1 : 0
            };
        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;