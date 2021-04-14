/* 
  Smart Component (interacts with NotificationsQueueModel)

  Uses react-toastify to display notifications from NotificationsQueueModel

  Usage:
    Add <NotificationsQueueController /> in main view, after the store initialization
*/

/* eslint-disable */
import { NotificationTypeEnum } from "lib/Enums";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function NotificationsQueueController() {
  const dispatch = useDispatch();

  const { notifications } = useSelector(
    (state) => state.NotificationsQueueModel
  );

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const notify = (type, message) => {
    switch (type) {
      case NotificationTypeEnum.SUCCESS:
        toast.success(message, toastOptions);
        break;
      case NotificationTypeEnum.ERROR:
        toast.error(message, toastOptions);
        break;
      case NotificationTypeEnum.WARN:
        toast.warn(message, toastOptions);
        break;
      default:
        toast.info(message, toastOptions);
    }
  };

  React.useEffect(() => {
    if (notifications && notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        const { type, message } = notifications[i];

        notify(type, message);
      }

      dispatch({
        type: "NotificationsQueueModel/clearNotifications",
      });
    }
  }, [notifications]);

  return <ToastContainer />;
}

export default NotificationsQueueController;
