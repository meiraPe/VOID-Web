import { create } from "zustand";

export const useMarcaStore = create((set) => ({
    marcas: [],
    setMarcas: (marcas) => set({ marcas }),
}))
