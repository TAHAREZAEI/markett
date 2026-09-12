import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  isDrawerOpen: boolean;
  addItem: (line: CartLine) => void;
  removeItem: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isDrawerOpen: false,
      addItem: (line) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === line.productId && l.variantId === line.variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + line.quantity } : l
              ),
              isDrawerOpen: true
            };
          }
          return { lines: [...state.lines, line], isDrawerOpen: true };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.filter((l) => !(l.productId === productId && l.variantId === variantId))
        })),
      setQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId && l.variantId === variantId ? { ...l, quantity } : l
          )
        })),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      clear: () => set({ lines: [] })
    }),
    { name: "verra-cart" }
  )
);
