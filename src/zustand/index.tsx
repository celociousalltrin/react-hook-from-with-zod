import { useCountStore } from "../store/count-store";
import { DogComponent } from "./zust-comp/comp1";

const ZustandDemo = () => {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.inc);
  const decrement = useCountStore((state) => state.dec);
  const multipliedValue = useCountStore((state) => state.multipleyBy100);
  return (
    <>
      <div>
        <h1>This is ZustandDemo Page</h1>
        <div style={{ display: "flex", gap: "5rem" }}>
          <div>
            <h3>The Count is</h3>
            <h1>{count}</h1>
          </div>
          <div>
            <h3>Value multiply by 100</h3>
            <h1>{multipliedValue()}</h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "3rem" }}>
          <button
            type="button"
            style={{
              backgroundColor: "#cbdcf7",
              padding: "0.4rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => increment(5)}
          >
            Add Count
          </button>
          {!!count && (
            <button
              type="button"
              style={{
                backgroundColor: "#ff6c37",
                padding: "0.4rem",
                borderRadius: "4px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => decrement(5)}
            >
              Decrement Count
            </button>
          )}
        </div>
      </div>
      <hr />
      <DogComponent />
    </>
  );
};
export default ZustandDemo;
