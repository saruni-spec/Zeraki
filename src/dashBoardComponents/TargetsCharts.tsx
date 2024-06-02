// Importing PieChart component and CSS styles
import PieChart from "./Pie";
import "../static/nav.css";

// Defining an interface for the targets
interface Targets {
  "Zeraki Analytics": { setTarget: number; achievedTarget: number };
  "Zeraki Finance": { setTarget: number; achievedTarget: number };
  "Zeraki Timetable": { setTarget: number; achievedTarget: number };
}

// Defining a functional component that takes targets as a prop
const TargetsCharts = ({ targets }: { targets: Targets }) => {
  return (
    <>
      <div className="pie">
        {/* Rendering PieChart component for Zeraki Analytics with data prop */}
        <PieChart
          data={{
            labels: ["Achieved", "Remaining"],
            datasets: [
              {
                data: [
                  targets["Zeraki Analytics"].achievedTarget,
                  targets["Zeraki Analytics"].setTarget -
                    targets["Zeraki Analytics"].achievedTarget,
                ],
                backgroundColor: ["#36A2EB", "#FFCE56"],
              },
            ],
          }}
          title="Analytics"
          target={targets["Zeraki Analytics"].setTarget}
          achieved={targets["Zeraki Analytics"].achievedTarget}
        />
        {/* Rendering PieChart component for Zeraki Finance with data prop */}
        <PieChart
          data={{
            labels: ["Achieved", "Remaining"],
            datasets: [
              {
                data: [
                  targets["Zeraki Finance"].achievedTarget,
                  targets["Zeraki Finance"].setTarget -
                    targets["Zeraki Finance"].achievedTarget,
                ],
                backgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          }}
          title="Finance"
          target={targets["Zeraki Finance"].setTarget}
          achieved={targets["Zeraki Finance"].achievedTarget}
        />
        {/* Rendering PieChart component for Zeraki Timetable with data prop */}
        <PieChart
          data={{
            labels: ["Achieved", "Remaining"],
            datasets: [
              {
                data: [
                  targets["Zeraki Timetable"].achievedTarget,
                  targets["Zeraki Timetable"].setTarget -
                    targets["Zeraki Timetable"].achievedTarget,
                ],
                backgroundColor: ["#FFCE56", "#FF6384"],
              },
            ],
          }}
          title="Timetable"
          target={targets["Zeraki Timetable"].setTarget}
          achieved={targets["Zeraki Timetable"].achievedTarget}
        />
      </div>
    </>
  );
};

// Exporting TargetsCharts component
export default TargetsCharts;
