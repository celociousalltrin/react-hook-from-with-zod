type MimickAPiCallType<T> = {
  data?: T;
  ms: number;
  isRejected?: boolean;
};

export const mimickAPiCall = <T,>({
  data = "default valiue" as T,
  ms,
  isRejected = false,
}: MimickAPiCallType<T>) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        isRejected ? reject({ message: "It is Rejected" }) : resolve(data),
      ms
    )
  );

type FormDataRestNames = "dates";

type FormDataRestTypes<K> = {
  [P in FormDataRestNames]: K[];
};

type FormDatatType<T, K> = {
  input: T;
  keys: Array<keyof T>;
} & FormDataRestTypes<K>;

export type FormIdType = {
  label: string;
  value: unknown;
};

const getFormatTypeByproperty = <K,>(key: K, data: FormDataRestTypes<K>) => {
  return Object.keys(data).reduce((acc, curr) => {
    if (data[curr as keyof FormDataRestTypes<K>].includes(key)) {
      acc = curr;
    }
    return acc;
  }, "id");
};

export const formatFormData = <T, K extends keyof T>({
  input,
  keys,
  ...rest
}: FormDatatType<T, K>) => {
  return keys.reduce(
    (acc, curr) => {
      let formatType = getFormatTypeByproperty(curr, rest);
      switch (formatType) {
        case "dates":
          if (acc[curr] instanceof Date) {
            (acc[curr] as string) = (acc[curr] as Date).toISOString();
          } else {
            acc[curr] = acc[curr];
          }
          break;
        default:
          if (acc[curr] instanceof Array) {
            (acc[curr] as any[]) = (acc[curr] as FormIdType[]).map(
              ({ value }) => value
            );
          } else if (
            acc[curr] instanceof Object &&
            (acc[curr] as FormIdType)?.value
          ) {
            (acc[curr] as any) = (acc[curr] as FormIdType).value;
          } else {
            acc[curr] = acc[curr];
          }
      }
      return acc;
    },
    { ...input }
  );
};
