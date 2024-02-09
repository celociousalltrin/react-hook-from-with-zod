import { useCatStore } from "../../store/cat-store";
import {
  addBigSingleCat,
  addFiveBigCats,
  addFiveSmallCats,
  addSmallSingleCat,
  clearCat,
  removeBigSingleCat,
  removeSmallSingleCat,
} from "../../store/cat-store";

export const CatComponent = () => {
  const largeCats = useCatStore((state) => state.cats.largeCat);
  const smallCats = useCatStore((state) => state.cats.smallCat);
  const numberOfCats = useCatStore((state) => state.numberOfCats);
  return (
    <div>
      <div>
        <div style={{ display: "flex", gap: "4rem" }}>
          <div>
            <h2>{largeCats}</h2>
            <p>Big Cats Count</p>
            <button onClick={addBigSingleCat} type="button">
              Add Big Cats
            </button>
            <button onClick={removeBigSingleCat} type="button">
              Remove Big Cats
            </button>
          </div>
          <div>
            <button onClick={() => addFiveBigCats(5)} type="button">
              Add 5 Big Cats
            </button>
            <button onClick={() => addFiveSmallCats(5)} type="button">
              Add 5 Small Cats
            </button>
          </div>
          <div>
            <h2>{smallCats}</h2>
            <p>Small Cats Count</p>
            <button onClick={addSmallSingleCat} type="button">
              Add Small Cats
            </button>
            <button onClick={removeSmallSingleCat} type="button">
              Remove Small Cats
            </button>
          </div>
          <div>
            <h2>{numberOfCats()}</h2>
            <p>Total Number of Cats</p>
          </div>
          <div style={{ margin: "auto", gap: "2rem" }}>
            <button onClick={() => clearCat()} type="button">
              Clear Cats on Store
            </button>
            <button
              type="button"
              onClick={() => useCatStore.persist.clearStorage()}
            >
              Clear on Local Storage
            </button>
            <div
              style={{ margin: "1rem" }}
              onClick={() => {
                clearCat();
                useCatStore.persist.clearStorage();
              }}
            >
              <button type="button">Clear both Local and store</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
