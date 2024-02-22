import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["red", "green", "blue", "pink", "orange", "yellow"],
      borderColor: ["black"],
      borderWidth: 2,
    },
  ],
};

export const DemoComponent = () => {
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
