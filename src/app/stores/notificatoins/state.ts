import { AppNotification } from "../../models/AppNotification";

export type NotificationsState = {
  notifications: AppNotification[];
};

export const INITIAL_NOTIFICATION_USER_STATE: NotificationsState = {
  notifications: [],
};
