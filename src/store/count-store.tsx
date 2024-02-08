import { create } from "zustand";
import { devtools } from "zustand/middleware";

type counterStore = {
  count: number;
  inc: (number: number) => void;
  dec: (number: number) => void;
  multipleyBy100: () => number;
};

export const useCountStore = create<counterStore>()(
  devtools(
    (set, get) => ({
      count: 0,
      inc: (number) => set((state) => ({ count: state.count + number })),
      dec: (number) => set((state) => ({ count: state.count - number })),
      multipleyBy100: () => {
        const number = get().count * 100;
        return number;
      },
    }),
    {
      enabled: true,
      name: "Count Store",
    }
  )
);

export const getStoreValues = (key: keyof counterStore) => {
  return useCountStore.getState()[key];
};
