import { TechPosts } from "./components/techs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { InfiniteTech } from "./components/infinite-tech";
import ReactSelect from "react-select";
import { PaginationTechs } from "./components/pagination-tech";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const ReactQuery = () => {
  const reactQueryData = [
    { label: "CRUD with react Query", value: "rtkList" },
    { label: "Infinite Query", value: "rtkiq" },
    { label: "Pagination", value: "rtkp" },
  ];
  const [tempPage, setTempPage] = useState(reactQueryData[0]);
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <ReactSelect
          options={reactQueryData}
          value={tempPage}
          onChange={(data) => setTempPage(data as typeof tempPage)}
        />
      </div>
      <QueryClientProvider client={queryClient}>
        {(() => {
          switch (tempPage.value) {
            case "rtkList":
              return <TechPosts />;
            case "rtkiq":
              return <InfiniteTech />;
            default:
              return <PaginationTechs />;
          }
        })()}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default ReactQuery;
