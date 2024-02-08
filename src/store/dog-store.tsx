import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TDogStore = {
  dogs: {
    smallDogs: number;
    bigDogs: number;
  };
  addBigDogs: () => void;
  addSmallDogs: () => void;
  removeBigDogs: () => void;
  removeSmallDogs: () => void;
  numberOfDogs: () => number;
  clearAllDogs: () => void;
};

const initialValue = {
  smallDogs: 0,
  bigDogs: 0,
};

export const useDogStore = create<TDogStore>()(
  devtools(
    persist(
      (set, get) => ({
        dogs: initialValue,
        addBigDogs: () =>
          set((state) => ({
            dogs: { ...state.dogs, bigDogs: state.dogs.bigDogs + 1 },
          })),
        addSmallDogs: () =>
          set((state) => ({
            dogs: { ...state.dogs, smallDogs: state.dogs.smallDogs + 1 },
          })),
        removeBigDogs: () =>
          set((state) => ({
            dogs: { ...state.dogs, bigDogs: state.dogs.bigDogs - 1 },
          })),
        removeSmallDogs: () =>
          set((state) => ({
            dogs: { ...state.dogs, smallDogs: state.dogs.smallDogs - 1 },
          })),
        numberOfDogs: () => get().dogs.bigDogs + get().dogs.smallDogs,
        clearAllDogs: () => set(() => ({ dogs: initialValue })),
      }),
      {
        name: "dog store",
      }
    ),
    { name: "Dog Store", enabled: true }
  )
);
