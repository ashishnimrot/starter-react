export interface AppNotification {
  message: string;
  title?: string;
  type: NotificationType;
  id: string;
  shown?: boolean;
  timeout?: number;
}

export type NotificationType = "success" | "error" | "warning" | "info";
