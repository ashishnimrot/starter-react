import { AppNotification } from "../models/AppNotification";
import store from "../stores";
import { NotificationActions } from "../stores/notificatoins";

export class NotificationService{
    static showSuccess(message: string, title?:string){
        store.dispatch(NotificationActions.showNotification({message, title, type:'success'} as AppNotification))
    }
    static showError(message: string, title?:string){
        store.dispatch(NotificationActions.showNotification({message, title, type:'error'} as AppNotification))
    }
    static showWarning(message: string, title?:string){
        store.dispatch(NotificationActions.showNotification({message, title, type:'warning'} as AppNotification))
    }
    static showInfo(message: string, title?:string){
        store.dispatch(NotificationActions.showNotification({message, title, type:'info'} as AppNotification))
    }
}