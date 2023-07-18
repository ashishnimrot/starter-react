import { useMemo } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { createAction } from "redux-actions";
import { AppUser } from "../../models/AppUser";
import { NotificationService } from "../../services/notifications.service";

export namespace AppUserActions {
  export enum Type {
    UPDATE_USER = "[USER] Update the user details",
  }

  export const updateUser = ({ role }: AppUser) => {
    return (dispatch: Dispatch) => {
      // set user role
      dispatch(
        setUser({
          role,
        })
      );
      NotificationService.showSuccess('Role change successfully!')
    };
  };

  export const setUser = createAction<AppUser>(Type.UPDATE_USER);
}

export type AppUserActions = Omit<typeof AppUserActions, "Type">;
export const useAppUserActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = AppUserActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [
    dispatch,
  ]) as AppUserActions;
};
