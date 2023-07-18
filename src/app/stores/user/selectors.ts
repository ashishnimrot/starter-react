import { RootState } from "../root";
import { createSelector } from 'reselect';

export const getUserState = (state: RootState) => state.userState;

export namespace AppUserSelectors {
    export const getRole = createSelector(getUserState, (state) => state.user.role);
}

