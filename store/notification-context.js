import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotifcation: function (notificationData) {}, // show the notification
  hideNotification: function () {},
});

export function NotificationContextProvide(propos) {
  const [activeNotircation, setActiveNotification] = useState();

  function showNotifcationHandler(notificationData) {
    setActiveNotification(notificationData);
    // {
    //     title: notificationData.title,
    //     message: notificationData.message,
    //     status: notificationData.status
    // }
  }
  function hideNotifcationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotircation,
    showNotifcation: showNotifcationHandler,
    hideNotifcation: hideNotifcationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {propos.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
