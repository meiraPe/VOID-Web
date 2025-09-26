import { create } from "zustand";

export const useProdutoStore = create((set) => ({
  produtos: [],
  setProdutos: (produtos) => set({ produtos }),
}));
