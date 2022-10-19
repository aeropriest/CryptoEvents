import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notificationData) {}, // show the notification
  hideNotification: function () {},
});

export function NotificationContextProvide(propos) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);
  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
    // {
    //     title: notificationData.title,
    //     message: notificationData.message,
    //     status: notificationData.status
    // }
  }
  function hideNotificationHandler() {
    console.log("hide notification in the context");
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {propos.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
