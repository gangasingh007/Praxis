import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  isOpen: boolean;
  toggleCollapse: () => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isCollapsed: false,
  isOpen: false,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));
