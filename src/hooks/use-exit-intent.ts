import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExitIntentState {
  hasSeenPopup: boolean;
  isPopupVisible: boolean;
  markAsSeen: () => void;
  showPopup: () => void;
  hidePopup: () => void;
}

export const useExitIntent = create<ExitIntentState>()(
  persist(
    (set) => ({
      hasSeenPopup: false,
      isPopupVisible: false,
      markAsSeen: () => set({ hasSeenPopup: true }),
      showPopup: () => set({ isPopupVisible: true }),
      hidePopup: () => set({ isPopupVisible: false }),
    }),
    {
      name: "ps24-exit-intent",
    }
  )
);
