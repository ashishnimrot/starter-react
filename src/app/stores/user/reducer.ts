import { Action, handleActions } from 'redux-actions';
import { AppUser } from '../../models/AppUser';
import { AppUserActions } from './actions';
import { INITIAL_USER_STATE, UserState } from "./state";
export enum Type {
    UPDATE_USER = "[USER] Update the user details",
}
export const appUserReducer = handleActions<UserState, any>(
    {
        [Type.UPDATE_USER]:(state, { payload: { role } }: Action<AppUser>) => ({
            ...state,
            user: {
                ...state.user,
                role    
            }
        })
    },
    INITIAL_USER_STATE
);