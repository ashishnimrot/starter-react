import { useDispatch, useSelector } from "react-redux"
import { NotificationActions, NotificationSelectors } from "../../../stores/notificatoins"
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

export const AppNotification = () => {
    const notifications =  useSelector(NotificationSelectors.getAllNotifications);
    const dispatch = useDispatch();

    const notification = notifications.filter((n) => !n.shown)[0];
    if(notification){
        return <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
            open={!!notification}
            autoHideDuration={6000}
            onClose={() => dispatch(NotificationActions.removeNotification(notification))}
            message={notification.message}
            key={notification.id}
        >
            <Alert  severity={notification.type} onClose={() => dispatch(NotificationActions.removeNotification(notification))}>{notification.message}</Alert>
        </Snackbar>
    }
    return null;
}