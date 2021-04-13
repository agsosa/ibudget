import { NotificationTypeEnum } from "lib/Enums";

/*
  NotificationsQueueModel (Consumed by NotificationQueueController)

  To display a toast notification.

  Notification object:{ type: value of NotificationTypeEnum, message: string to display }

  Usage:
    Dispatch "pushNotification" with a Notification object as payload
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
