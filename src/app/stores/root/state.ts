import { NotificationsState } from "../notificatoins/state";
import { UserState } from "../user/state";

export interface RootState{
    userState: UserState;
    notificationsState: NotificationsState;
}