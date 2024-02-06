import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteTech, techDataType } from "../react-query-service/method";
import InfiniteScroll from "react-infinite-scroll-component";

export const InfiniteTech = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["InfiniteQuery"],
    queryFn: ({ pageParam }) => getInfiniteTech(pageParam),
    staleTime: Infinity,
    select: (data) => {
      const result = data.pages.reduce((acc: techDataType[], curr) => {
        acc = [...acc, ...curr.data.data];
        return acc;
      }, []);
      return result;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.next > lastPage.data.last) {
        return false;
      }
      return lastPage.data.next;
    },
    initialPageParam: 1,
  });

  return (
    <div>
      {isLoading && <h1>The Data is Getting from api......</h1>}
      <h1>This is InfiniteTech Component</h1>
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h1>Loading.....</h1>}
      >
        {data?.map((o) => (
          <div
            key={`infiniteList${o.id}`}
            style={{ backgroundColor: "#ff9a6a", marginBottom: "5rem" }}
          >
            <p>
              Id:
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {o.id}
              </span>
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
      </InfiniteScroll>
      {/* {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          type="button"
          style={{ cursor: "pointer" }}
        >
          Load More
        </button>
      )} */}
    </div>
  );
};
