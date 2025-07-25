import { create } from "zustand";

interface ActiveTabStore {
  activeTab: "text" | "file";
  setActiveTab: (text: "text" | "file") => void;
}

export const useActiveStore = create<ActiveTabStore>((set) => ({
    activeTab: "text",
    setActiveTab: (activeTab) => set({ activeTab }),
}));
