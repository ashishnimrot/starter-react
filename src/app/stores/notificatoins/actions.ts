import { useMemo } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { createAction } from "redux-actions";
import { AppNotification } from "../../models/AppNotification";

export namespace NotificationActions {
  export enum Type {
    ADD_NOTIFICATION = "[NOTIFICATION] Add Notification to notification list",
    HIDE_NOTIFICATION = "[NOTIFICATION] Remove Notification from notification list",
    SHOW_NOTIFICATION = "[NOTIFICATION] Show a generic notification",
    DELETE_NOTIFICATION = "[NOTIFICATION] Delete a generic notification",
  }

  export const addNotification = createAction<AppNotification>(Type.ADD_NOTIFICATION);
  export const removeNotification = createAction<AppNotification>(Type.HIDE_NOTIFICATION);
  export const showNotification = (notification: AppNotification) => addNotification(notification);
  export const deleteNotification = createAction<AppNotification>(Type.DELETE_NOTIFICATION);
}

export type NotificationActions = Omit<typeof NotificationActions, "Type">;
export const useNotificationActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = NotificationActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [
    dispatch,
  ]) as NotificationActions;
};
