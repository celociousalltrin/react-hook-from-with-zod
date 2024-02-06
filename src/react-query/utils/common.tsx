var data = [
  { id: 1, title: "React", description: "Description for React" },
  { id: 2, title: "Vue", description: "Description for Vue" },
  { id: 3, title: "Angular", description: "Description for Angular" },
  { id: 4, title: "Node.js", description: "Description for Node.js" },
  { id: 5, title: "Express", description: "Description for Express" },
  { id: 6, title: "MongoDB", description: "Description for MongoDB" },
  { id: 7, title: "GraphQL", description: "Description for GraphQL" },
  { id: 8, title: "Django", description: "Description for Django" },
  { id: 9, title: "Flask", description: "Description for Flask" },
  { id: 10, title: "Spring Boot", description: "Description for Spring Boot" },
  { id: 11, title: "Vue.js", description: "Description for Vue.js" },
  {
    id: 12,
    title: "React Native",
    description: "Description for React Native",
  },
  { id: 13, title: "Flutter", description: "Description for Flutter" },
  { id: 14, title: "Swift", description: "Description for Swift" },
  { id: 15, title: "Kotlin", description: "Description for Kotlin" },
  { id: 16, title: "Go", description: "Description for Go" },
  {
    id: 17,
    title: "Ruby on Rails",
    description: "Description for Ruby on Rails",
  },
  { id: 18, title: "ASP.NET", description: "Description for ASP.NET" },
  { id: 19, title: "Laravel", description: "Description for Laravel" },
  { id: 20, title: "Symfony", description: "Description for Symfony" },
  { id: 21, title: "Ember.js", description: "Description for Ember.js" },
  { id: 22, title: "Svelte", description: "Description for Svelte" },
  { id: 23, title: "Next.js", description: "Description for Next.js" },
];

export type datatype = typeof data;
const responseMessage = () => {
  return { code: "ER0001", msg: "Something Went Wrong" };
};

const sendResponse = <T,>(input: T) => {
  return {
    response_data: input,
    code: "OK0001",
    msg: "It is Success Api",
  };
};

type fakeApitypes<T> = {
  input: T[] | T;
} & commonTypes;

type commonTypes = {
  is_rej: boolean;
  ms: 1000 | 2000 | 3000 | 50000;
};

type getPostWithQureryTypes = {
  limit?: number;
  search?: string;
} & Partial<commonTypes>;

const fakeApi = <T,>({ input, is_rej, ms }: fakeApitypes<T>) => {
  return new Promise((res, rej) =>
    setTimeout(
      () => (is_rej ? rej(responseMessage()) : res(sendResponse(input))),
      ms
    )
  );
};

export const getPosts = ({
  is_rej = false,
  ms = 1000,
}: Partial<commonTypes>) => {
  return fakeApi({ input: data, is_rej, ms });
};

export const getPostsWithQuery = ({
  limit = 0,
  search = "",
  is_rej = false,
  ms = 1000,
}: getPostWithQureryTypes) => {
  const result = data
    .filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
    .filter((_, i) => i < (limit ? limit : data.length));

  return fakeApi({ input: result, is_rej, ms });
};

export const createPost = ({
  input,
  is_rej = false,
  ms = 1000,
}: {
  input: (typeof data)[0];
} & Partial<commonTypes>) => {
  data.unshift(input);

  return fakeApi({ input, is_rej, ms });
};

export const updatePost = ({
  input,
  is_rej = false,
  ms = 1000,
}: {
  input: Partial<(typeof data)[0]>;
} & Partial<commonTypes>) => {
  const result = data.map((o) => {
    if (o.id === 1) {
      return { ...o, ...input };
    } else {
      return o;
    }
  });
  data = result;
  return fakeApi({ input, is_rej, ms });
};

export const deletepost = ({
  input,
  is_rej = false,
  ms = 1000,
}: {
  input: Partial<(typeof data)[0]>;
} & Partial<commonTypes>) => {
  const result = data.filter((o) => o.id !== input.id);
  data = result;
  return fakeApi({ input, is_rej, ms });
};

export const getSinglePost = ({
  id,
  is_rej = false,
  ms = 1000,
}: { id: number } & Partial<commonTypes>) => {
  const result = data.find((obj) => obj.id === id);
  return fakeApi({ input: result, is_rej, ms });
};
