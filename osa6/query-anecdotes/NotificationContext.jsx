import React, { createContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Clear notification after 5 seconds
  };

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
