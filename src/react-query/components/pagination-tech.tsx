import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { getInfiniteTech, techDataType } from "../react-query-service/method";
import "./style.css";

export const PaginationTechs = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["Pagination", page],
    queryFn: () => getInfiniteTech(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const generateArrayofNum = (input: number) => {
    const myArr = [];
    for (let i = 1; i <= input; i++) {
      myArr.push(i);
    }
    return myArr;
  };

  return (
    <div>
      {isLoading && <h1>Pagination Loading...</h1>}
      <h1>This is PaginationTechs Component</h1>
      {data?.data.data.map((o: techDataType) => (
        <div key={`Page${o.id}`} style={{ backgroundColor: "#84adea" }}>
          <p>
            Id:
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>{o.id}</span>
          </p>
          <p>
            Title:
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {o.title}
            </span>
          </p>
          <p>
            Description:
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {o.description}
            </span>
          </p>
          <p>
            FrameWorkType:
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {o.frameworkType}
            </span>
          </p>
          <p>
            Release Year:
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {o.releaseYear}
            </span>
          </p>
        </div>
      ))}
      <div style={{ display: "flex" }}>
        {data?.data.next && (
          <button
            style={{ backgroundColor: "lightblue", cursor: "pointer" }}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
        <div className="pagination">
          {generateArrayofNum(data?.data.pages).map((o) => {
            if (page === o && isFetching) {
              return (
                <p key={`pagination${o}`} style={{ color: "red" }}>
                  load
                </p>
              );
            } else {
              return (
                <p
                  key={`pagination${o}`}
                  onClick={() => setPage(o)}
                  className={page === o ? "active" : ""}
                >
                  {o}
                </p>
              );
            }
          })}
        </div>
        {data?.data.prev && (
          <button
            style={{ backgroundColor: "lightcoral", cursor: "pointer" }}
            type="button"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
};
