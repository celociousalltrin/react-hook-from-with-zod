import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TCatStore = {
  cats: { smallCat: number; largeCat: number };
  numberOfCats: () => number;
};

const catInitialValue = {
  smallCat: 0,
  largeCat: 0,
};

export const useCatStore = create<TCatStore>()(
  devtools(
    persist(
      (_, get) => ({
        cats: catInitialValue,
        numberOfCats: () => get().cats.smallCat + get().cats.largeCat,
      }),
      { name: "cat store" }
    ),
    { name: "Cat Store", enabled: true }
  )
);

export const addBigSingleCat = () =>
  useCatStore.setState((state) => ({
    cats: { ...state.cats, largeCat: state.cats.largeCat + 1 },
  }));
export const addSmallSingleCat = () =>
  useCatStore.setState((state) => ({
    cats: { ...state.cats, smallCat: state.cats.smallCat + 1 },
  }));
export const removeBigSingleCat = () =>
  useCatStore.setState((state) => ({
    cats: { ...state.cats, largeCat: state.cats.largeCat - 1 },
  }));
export const removeSmallSingleCat = () =>
  useCatStore.setState((state) => ({
    cats: { ...state.cats, smallCat: state.cats.smallCat - 1 },
  }));

export const addFiveBigCats = (number: number) =>
  useCatStore.setState((state) => ({
    cats: { ...state.cats, largeCat: state.cats.largeCat + number },
  }));

export const addFiveSmallCats = (number: number) =>
  useCatStore.setState((state) => ({
    cats: { ...state.cats, smallCat: state.cats.smallCat + number },
  }));

export const clearCat = () =>
  useCatStore.setState(() => ({ cats: catInitialValue }));
