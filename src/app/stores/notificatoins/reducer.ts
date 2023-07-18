import { handleActions } from "redux-actions";
import { NotificationActions } from "./actions";
import { INITIAL_NOTIFICATION_USER_STATE, NotificationsState } from "./state";

export const notificationReducer = handleActions<NotificationsState, any>(
  {
    [NotificationActions.Type.ADD_NOTIFICATION]: (state, action) => ({
      ...state,
      notifications: [
        ...state.notifications,
        { ...action.payload, id: new Date().getTime() },
      ],
    }),
    [NotificationActions.Type.DELETE_NOTIFICATION]: (
      state,
      { payload: notification }
    ) => {
      const notificationToKeep = state.notifications.filter(
        (n) => n.id !== notification.id
      );
      return {
        ...state,
        notifications: notificationToKeep,
      };
    },
    [NotificationActions.Type.HIDE_NOTIFICATION]: (
      state,
      { payload: notification }
    ) => {
      const notificationToKeep = state.notifications.map((n) =>
        n.id == notification.id ? { ...n, shown: true } : n
      );
      return {
        ...state,
        notifications: notificationToKeep,
      };
    },
  },
  INITIAL_NOTIFICATION_USER_STATE
);
