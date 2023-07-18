import { RootState } from "../root";
import { createSelector } from 'reselect';

export const getNotificatonState = (state: RootState) => state.notificationsState;

export namespace NotificationSelectors {
    export const getAllNotifications = createSelector(getNotificatonState, (state) => state.notifications);
}

