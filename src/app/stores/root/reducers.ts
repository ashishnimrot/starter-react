import { combineReducers } from "redux";
import { notificationReducer } from "../notificatoins/reducer";
import { appUserReducer } from "../user/reducer";
import { RootState } from "./state";
// export type { RootState };
export const rootReducer = combineReducers<RootState>({
    userState: appUserReducer,
    notificationsState: notificationReducer
});
