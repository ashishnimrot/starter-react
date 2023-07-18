import { AppUser } from "../../models/AppUser"

export type UserState = {
    user: AppUser;
}

export const INITIAL_USER_STATE: UserState = {
    user: {
        firstName: 'Demo',
        lastName: 'Demo',
        email: 'demo@admin.com',
        role: 'Admin'
    }
}