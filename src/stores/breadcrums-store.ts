// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

export type BreadCrumbsState = {
  breadCrumbs: string[];
};

export type BreadCrumbsActions = {
  add: (breadCrumb: string) => void;
  remove: (breadCrumb: string) => void;
};

export type BreadCrumbsStore = BreadCrumbsState & BreadCrumbsActions;

export const defaultInitState: BreadCrumbsState = {
  breadCrumbs: ["Dashboard"],
};

export const createBreadCrumbsStore = (
  initState: BreadCrumbsState = defaultInitState
) => {
  return createStore<BreadCrumbsStore>()((set) => ({
    ...initState,
    add: (breadCrumb) =>
      set((state) => ({ breadCrumbs: [...state.breadCrumbs, breadCrumb] })),
    remove: (breadCrumb) =>
      set((state) => ({
        breadCrumbs: state.breadCrumbs.filter((b) => b !== breadCrumb),
      })),
  }));
};
