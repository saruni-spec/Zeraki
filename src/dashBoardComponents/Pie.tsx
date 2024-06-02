import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, Title, ArcElement);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  title: string;
  target: number;
  achieved: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  target,
  achieved,
}) => {
  return (
    <div className="pie">
      <div>
        <h3>{title}</h3>
        <p>Target: {target}</p>
        <p>Achieved: {achieved}</p>
      </div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
