type TBarTypes = {
  chartSliceCount: number;
  sliceKeyName: string[];
  legendsName: string[];
  input: Record<string, any>[];
  XAxisKey: string;
  bgColor: string[];
  bdrColor: string;
  bdrWidth: number;
};

export const DataFormatFunction = ({
  input,
  XAxisKey,
  sliceKeyName,
  chartSliceCount,
  legendsName,
  bgColor,
  bdrColor,
  bdrWidth,
}: TBarTypes): any => {
  console.log("🚀 ~ chartSliceCount:", chartSliceCount);
  if (
    chartSliceCount !== sliceKeyName.length ||
    chartSliceCount !== legendsName.length
  ) {
    throw new Error(
      "Chart Function Error: Bars Number Needs to match the length of barkeyname and legendsName"
    );
  }
  const barsInArray = [];
  for (let i = 0; i < bgColor.length; i++) {
    barsInArray.push(i);
  }

  return {
    labels: input.map((o: any) => o[XAxisKey]),
    datasets: barsInArray.map((o) => {
      return {
        label: legendsName[o],
        data: input.map((xx) => xx[sliceKeyName[o]]),
        backgroundColor: bgColor[o],
        borderColor: bdrColor,
        borderWidth: bdrWidth,
      };
    }),
  };
};

export const numberFormatter = (num: number, digits = 1, currency = "USD") => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  const symb = formatter.format(1).replace("1.00", "");

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: " Million" },
    { value: 1e9, symbol: " Billion" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return (
    symb +
    (item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0")
  );
};

export type TChartComponentType = {
  Component: any;
  data: Record<string, any>[];
  chartData: {
    chartSliceCount: number;
    sliceKeyName: string[];
    legendsName: string[];
    XAxisKey: string;
  };
  barStyle?: {
    bgColor?: string[];
    bdrColor?: string;
    bdrWidth?: number;
  };
  isOption?: boolean;
  option?: Record<string, any>;
};
