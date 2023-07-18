export type UserRole = "Admin" | "Registar";
export interface AppUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  role: UserRole;
}