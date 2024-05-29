import { useState } from "react";
import "../static/nav.css";

interface Metrics {
  colletions: number;
  total_signups: number;
  revenue: number;
  bounced_checks: number;
}
interface Targets {
  analytics: [number, number];
  finance: [number, number];
  timetable: [number, number];
}

interface SignUps {
  primary: [number, number];
  secondary: [number, number];
  IGCSE: [number, number];
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [targets, setTargets] = useState<Targets>();
  const [signUps, setSignUps] = useState<SignUps>();
  const [invoices, setInvoices] = useState<number>();

  return (
    <ul className="nav">
      <li>Metrics</li>
      <li>Targets</li>
      <li>Sign Up Overview</li>
      <li>Invoices</li>
    </ul>
  );
};

export default Dashboard;
