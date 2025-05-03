import { createContext, useContext, useState } from "react";

type NotificationType = "error" | "success" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<{
    message: string;
    id: number;
    type: NotificationType;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    const id: number = Date.now();
    setNotification({ id, type, message });
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="toast toast-top toast-center">
          <div className={`alert ${getAlertClass(notification.type)}`}></div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function getAlertClass(type: NotificationType) {
  switch (type) {
    case "error":
      return "alert-error";
    case "success":
      return "alert-success";
    case "info":
      return "alert-info";
    case "warning":
      return "alert-warning";
    default:
      return "alert-info";
  }
}

export const useNotification = () =>  {
    const context = useContext(NotificationContext);
    if(context === undefined){
        throw new Error('useNotification must be used inside notification context provider')
    }

    return context;
}