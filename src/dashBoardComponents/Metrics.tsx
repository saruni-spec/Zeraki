import React, { useState } from "react";

interface Revenue {
  product: string;
  amount: number;
  id: string;
}

interface Metrics {
  colletions: number;
  total_signups: number;
  revenue: Revenue[];
  bounced_checks: number;
}
interface MetricsTabProps {
  metrics: Metrics;
  setCurrentItem: (item: string) => void;
}

const MetricsTab: React.FC<MetricsTabProps> = ({ metrics, setCurrentItem }) => {
  const [current, setCurrent] = useState<string>("squared");

  return (
    <div className="squared">
      {current === "squared" && (
        <>
          <p className="card" onClick={() => setCurrentItem("collections")}>
            Total Collections
            <br /> {metrics.colletions}
          </p>
          <p className="card" onClick={() => setCurrentItem("signupsOverview")}>
            Total Signups
            <br /> {metrics.total_signups}
          </p>
          <p className="card" onClick={() => setCurrent("revenue")}>
            Total Revenue <br />
            {metrics.revenue.reduce(
              (total: number, item: Revenue) => total + item.amount,
              0
            )}
          </p>
          <p className="card" onClick={() => setCurrentItem("collections")}>
            Bounced Checks
            <br /> {metrics.bounced_checks}
          </p>
        </>
      )}
      {current === "revenue" && (
        <>
          <p
            className="card"
            id="activeCard"
            onClick={() => setCurrent("squared")}
          >
            Back to All Metrics
          </p>
          {metrics.revenue.map((item: Revenue, index: number) => (
            <p key={index} className="card">
              {item.product} <br />
              {item.amount}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default MetricsTab;
