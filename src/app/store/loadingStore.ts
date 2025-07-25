import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  toggleLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    isLoading: false,
    toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}));
