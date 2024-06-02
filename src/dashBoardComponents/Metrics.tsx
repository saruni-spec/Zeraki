interface Metrics {
  colletions: number;
  total_signups: number;
  revenue: number;
  bounced_checks: number;
}

const MetricsTab = ({ metrics }: { metrics: Metrics }) => {
  return (
    <div className="squared">
      <p className="card">
        Total Collections
        <br /> {metrics.colletions}
      </p>
      <p className="card">
        Total Signups
        <br /> {metrics.total_signups}
      </p>
      <p className="card">
        Total Revenue <br />
        {metrics.revenue}
      </p>
      <p className="card">
        Bounced Checks
        <br /> {metrics.bounced_checks}
      </p>
    </div>
  );
};

export default MetricsTab;
