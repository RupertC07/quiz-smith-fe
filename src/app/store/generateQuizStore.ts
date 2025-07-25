import { create } from "zustand";

interface GenerateQuizStore {
  textInput: string;
  selectedFile: File | null;
  setTextInput: (text: string) => void;
  setSelectedFile: (file: File | null) => void;
  clearInputs: () => void;
}

export const useGenarateQuizStore = create<GenerateQuizStore>((set) => ({
  textInput: "",
  selectedFile: null,
  setTextInput: (text) => set({ textInput: text }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  clearInputs: () => set({ textInput: "", selectedFile: null }),
}));
