import {create} from "zustand";

export type Notification = {
  id?: string | number;
  type: "error" | "success" | "warning" | "info";
  message: string[];
};

interface UiState {
  notifications: Notification[] | null;

  addNotification: (notification: Notification) => void;
  removeNotification: (id: Notification["id"]) => void;
  cleanNotifications: () => void;
}

export const useUistore = create<UiState>()(set => ({
  notifications: null,

  addNotification: (notification: Notification) => {
    const newNotification: Notification = {
      ...notification,
      id: new Date().getTime() + 1,
    };

    set(state => ({
      notifications:
        state.notifications !== null
          ? [...state.notifications, newNotification].slice(-3)
          : [newNotification],
    }));
  },

  removeNotification: (id: Notification["id"]) => {
    set(state => ({
      notifications:
        state.notifications &&
        state.notifications?.filter(notification => notification.id !== id),
    }));
  },

  cleanNotifications: () => {
    set({notifications: null});
  },
}));
