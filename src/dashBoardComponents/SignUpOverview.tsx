// Importing BarChart component and CSS styles
import BarChart from "./Bar";
import "../static/nav.css";

// Defining an interface for the sign up overview
interface SignUpOverview {
  "Zeraki Analytics": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Finance": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Timetable": { Primary: number; Secondary: number; IGCSE: number };
}

// Defining a functional component that takes signUps as a prop
const SignUpChart = ({ signUps }: { signUps: SignUpOverview }) => {
  return (
    <div className="pie">
      {/* Rendering BarChart component with data prop */}
      <BarChart
        data={{
          labels: ["Zeraki Analytics", "Zeraki Finance", "Zeraki Timetable"],
          datasets: [
            {
              label: "Primary",
              // Getting Primary data for each category
              data: [
                signUps["Zeraki Analytics"].Primary,
                signUps["Zeraki Finance"].Primary,
                signUps["Zeraki Timetable"].Primary,
              ],
              backgroundColor: "#36A2EB",
            },
            {
              label: "Secondary",
              // Getting Secondary data for each category
              data: [
                signUps["Zeraki Analytics"].Secondary,
                signUps["Zeraki Finance"].Secondary,
                signUps["Zeraki Timetable"].Secondary,
              ],
              backgroundColor: "#FFCE56",
            },
            {
              label: "IGCSE",
              // Getting IGCSE data for each category
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

// Exporting SignUpChart component
export default SignUpChart;
