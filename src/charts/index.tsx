import { useState } from "react";
import { numberFormatter } from "./common";
import { ChartComponent } from "./component/barChart";
import { SampleData, InvestmentData } from "./mock-data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import ReactSelect from "react-select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReactCharts = () => {
  const chartCompOptions = [
    { label: "Bar Chart", value: "bar" },
    { label: "Line Chart", value: "line" },
    { label: "Pie Chart", value: "pie" },
    { label: "Doughnut Chart", value: "doughnut" },
  ];
  const [chartSelectedValue, setChartSelectedValue] = useState(
    chartCompOptions[0]
  );

  const xx = [
    {
      name: "Aloma Equity",
      total_investment: 2222,
    },
    {
      name: "taj Coramandel",
      total_investment: 11111,
    },
  ];
  const yy = [
    {
      name: "Dhoni",
      total_investment: 888,
    },
    {
      name: "cj",
      total_investment: 34431,
    },
  ];

  const multiToolTipValue = (data: Record<string, any>) => {
    switch (data.dataset.label) {
      case "Investment By Year":
        return ["", ...xx.map((o) => `${o.name}: ${o.total_investment}`)];
      case "Distributed By Year":
        return ["", ...yy.map((o) => `${o.name}: ${o.total_investment}`)];
      default:
        return null;
    }
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return numberFormatter(value);
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
      tooltip: {
        callbacks: {
          afterBody: (values: Record<string, any>[]) =>
            multiToolTipValue(values[0]),
        },
      },
    },
  };
  return (
    <div>
      <h1>React Charts with ChartJs and React Chartjs 2</h1>
      <ReactSelect
        options={chartCompOptions}
        onChange={(data) =>
          setChartSelectedValue(data as typeof chartSelectedValue)
        }
        value={chartSelectedValue}
      />
      <div>
        {(() => {
          switch (chartSelectedValue.value) {
            case "bar":
              return (
                <div>
                  <ChartComponent
                    Component={Bar}
                    data={InvestmentData}
                    chartData={{
                      chartSliceCount: 2,
                      sliceKeyName: ["investments", "distributed"],
                      legendsName: [
                        "Investment By Year",
                        "Distributed By Year",
                      ],
                      XAxisKey: "year",
                    }}
                    barStyle={{
                      bdrColor: "green",
                      bdrWidth: 4,
                      bgColor: ["pink", "red"],
                    }}
                    isOption={true}
                    option={options}
                  />
                  <ChartComponent
                    Component={Bar}
                    data={SampleData}
                    chartData={{
                      chartSliceCount: 1,
                      sliceKeyName: ["investments"],
                      legendsName: ["Investment By Year"],
                      XAxisKey: "year",
                    }}
                  />
                </div>
              );
            case "line":
              return (
                <>
                  <ChartComponent
                    Component={Line}
                    data={InvestmentData}
                    chartData={{
                      chartSliceCount: 2,
                      sliceKeyName: ["investments", "distributed"],
                      legendsName: [
                        "Investment By Year",
                        "Distributed By Year",
                      ],
                      XAxisKey: "year",
                    }}
                    barStyle={{
                      bdrColor: "green",
                      bdrWidth: 4,
                      bgColor: ["pink", "red"],
                    }}
                    isOption={true}
                    option={options}
                  />
                  <ChartComponent
                    Component={Line}
                    data={SampleData}
                    chartData={{
                      chartSliceCount: 1,
                      sliceKeyName: ["investments"],
                      legendsName: ["Investment By Year"],
                      XAxisKey: "year",
                    }}
                  />
                </>
              );
            case "pie":
              return (
                <>
                  <ChartComponent
                    Component={Pie}
                    data={InvestmentData}
                    chartData={{
                      chartSliceCount: 2,
                      sliceKeyName: ["investments", "distributed"],
                      legendsName: [
                        "Investment By Year",
                        "Distributed By Year",
                      ],
                      XAxisKey: "year",
                    }}
                    barStyle={{
                      bdrColor: "green",
                      bdrWidth: 4,
                      bgColor: ["pink", "red"],
                    }}
                    isOption={true}
                    option={options}
                  />
                  <ChartComponent
                    Component={Pie}
                    data={SampleData}
                    chartData={{
                      chartSliceCount: 1,
                      sliceKeyName: ["investments"],
                      legendsName: ["Investment By Year"],
                      XAxisKey: "year",
                    }}
                  />
                </>
              );
            case "doughnut":
              return (
                <>
                  <ChartComponent
                    Component={Doughnut}
                    data={InvestmentData}
                    chartData={{
                      chartSliceCount: 2,
                      sliceKeyName: ["investments", "distributed"],
                      legendsName: [
                        "Investment By Year",
                        "Distributed By Year",
                      ],
                      XAxisKey: "year",
                    }}
                    barStyle={{
                      bdrColor: "green",
                      bdrWidth: 4,
                      bgColor: ["pink", "red"],
                    }}
                    isOption={true}
                    option={options}
                  />
                  <ChartComponent
                    Component={Doughnut}
                    data={SampleData}
                    chartData={{
                      chartSliceCount: 1,
                      sliceKeyName: ["investments"],
                      legendsName: ["Investment By Year"],
                      XAxisKey: "year",
                    }}
                  />
                </>
              );
            default:
              return <h1>No Component To Show</h1>;
          }
        })()}
      </div>
    </div>
  );
};
export default ReactCharts;
