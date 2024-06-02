import BarChart from "./Bar";
import "../static/nav.css";

interface SignUpOverview {
  "Zeraki Analytics": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Finance": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Timetable": { Primary: number; Secondary: number; IGCSE: number };
}

const SignUpChart = ({ signUps }: { signUps: SignUpOverview }) => {
  return (
    <div className="pie">
      <BarChart
        data={{
          labels: ["Zeraki Analytics", "Zeraki Finance", "Zeraki Timetable"],
          datasets: [
            {
              label: "Primary",
              data: [
                signUps["Zeraki Analytics"].Primary,
                signUps["Zeraki Finance"].Primary,
                signUps["Zeraki Timetable"].Primary,
              ],
              backgroundColor: "#36A2EB",
            },
            {
              label: "Secondary",
              data: [
                signUps["Zeraki Analytics"].Secondary,
                signUps["Zeraki Finance"].Secondary,
                signUps["Zeraki Timetable"].Secondary,
              ],
              backgroundColor: "#FFCE56",
            },
            {
              label: "IGCSE",
              data: [
                signUps["Zeraki Analytics"].IGCSE,
                signUps["Zeraki Finance"].IGCSE,
                signUps["Zeraki Timetable"].IGCSE,
              ],
              backgroundColor: "#FF6384",
            },
          ],
        }}
      />
    </div>
  );
};

export default SignUpChart;
