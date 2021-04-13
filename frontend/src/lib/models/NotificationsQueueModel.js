import { NotificationTypeEnum } from "lib/Enums";

/*
  NotificationsQueueModel (Consumed by NotificationQueueController)

  To display a toast notification.

  Usage:
    Dispatch "pushNotification" with a Notification object as payload
    Shape of Notification: { type: value of NotificationTypeEnum, message: string to display }
*/
export default {
  name: "NotificationsQueueModel",
  state: {
    notifications: [], // Array of Notification object
  },
  reducers: {
    // Display a notification. Payload should be a Notification object
    pushNotification(state, payload) {
      if (
        payload &&
        Object.values(NotificationTypeEnum).includes(payload.type) &&
        payload.message
      ) {
        return { ...state, notifications: [...state.notifications, payload] };
      }

      return state;
    },
    // Used by NotificationQueueController after consuming all the notifications
    clearNotifications(state) {
      return {
        ...state,
        notifications: [],
      };
    },
  },
};
