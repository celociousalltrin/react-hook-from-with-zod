import { TechPosts } from "./components/techs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const ReactQuery = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TechPosts />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default ReactQuery;
