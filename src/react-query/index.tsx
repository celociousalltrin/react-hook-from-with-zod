import { TechPosts } from "./components/techs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { InfiniteTech } from "./components/infinite-tech";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const ReactQuery = () => {
  const [isInfinite, setIsInfinite] = useState(false);
  return (
    <>
      <button
        type="button"
        style={{
          backgroundColor: "grey",
          borderRadius: "10px",
          padding: "10px",
          cursor: "Pointer",
          color: "white",
          margin: "1rem",
        }}
        onClick={() => setIsInfinite(!isInfinite)}
      >
        Toggle {!isInfinite ? "Infinite Tech" : "Tech List"}
      </button>
      <QueryClientProvider client={queryClient}>
        {isInfinite ? <InfiniteTech /> : <TechPosts />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default ReactQuery;
