import { DataFormatFunction } from "../common";

import { type TChartComponentType } from "../common";

export const ChartComponent = ({
  Component,
  data,
  chartData: { chartSliceCount, sliceKeyName, legendsName, XAxisKey },
  barStyle: {
    bgColor = ["green", "yellow"],
    bdrColor = "black",
    bdrWidth = 3,
  } = {},
  isOption = false,
  option,
}: TChartComponentType) => {
  const formatedData = DataFormatFunction({
    input: data,
    sliceKeyName,
    chartSliceCount,
    legendsName,
    XAxisKey,
    bgColor,
    bdrColor,
    bdrWidth,
  });

  return (
    <div>
      <Component data={formatedData} options={isOption ? option : {}} />
    </div>
  );
};
