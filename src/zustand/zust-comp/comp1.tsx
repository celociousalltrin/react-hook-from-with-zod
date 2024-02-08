import { useDogStore } from "../../store/dog-store";

export const DogComponent = () => {
  const dogs = useDogStore((state) => state.dogs);
  const addBigDogs = useDogStore((state) => state.addBigDogs);
  const addSmallDogs = useDogStore((state) => state.addSmallDogs);
  const removeBigDogs = useDogStore((state) => state.removeBigDogs);
  const removeSmallDogs = useDogStore((state) => state.removeSmallDogs);
  const clearDogs = useDogStore((state) => state.clearAllDogs);
  const numberOfDogs = useDogStore((state) => state.numberOfDogs);
  return (
    <div>
      <div style={{ display: "flex", gap: "4rem" }}>
        <div>
          <h2>{dogs.bigDogs}</h2>
          <p>Big Dogs Count</p>
          <button onClick={addBigDogs} type="button">
            Add Big Dogs
          </button>
          <button onClick={removeBigDogs} type="button">
            Remove Big Dogs
          </button>
        </div>
        <div>
          <h2>{dogs.smallDogs}</h2>
          <p>Small Dogs Count</p>
          <button onClick={addSmallDogs} type="button">
            Add Small Dogs
          </button>
          <button onClick={removeSmallDogs} type="button">
            Remove Small Dogs
          </button>
        </div>
        <div>
          <h2>{numberOfDogs()}</h2>
          <p>Total Number of Dogs</p>
        </div>
        <div style={{ margin: "auto", gap: "2rem" }}>
          <button onClick={() => clearDogs()} type="button">
            Clear Dogs on Store
          </button>
          <button
            type="button"
            onClick={() => useDogStore.persist.clearStorage()}
          >
            Clear on Local Storage
          </button>
          <div
            style={{ margin: "1rem" }}
            onClick={() => {
              clearDogs();
              useDogStore.persist.clearStorage();
            }}
          >
            <button type="button">Clear both Local and store</button>
          </div>
        </div>
      </div>
    </div>
  );
};
