import { useEffect, useState } from "react";
import "../static/nav.css";
import NavList from "../components/Nav";

import TargetsCharts from "../dashBoardComponents/TargetsCharts";
import SignUpChart from "../dashBoardComponents/SignUpOverview";
import UpcomingInvoices from "../dashBoardComponents/UpcomingInvoices";
import Collections from "../dashBoardComponents/Collections";
import MetricsTab from "../dashBoardComponents/Metrics";
import Loading from "../components/Loading";

interface Metrics {
  colletions: number;
  total_signups: number;
  revenue: number;
  bounced_checks: number;
}

interface Targets {
  "Zeraki Analytics": { setTarget: number; achievedTarget: number };
  "Zeraki Finance": { setTarget: number; achievedTarget: number };
  "Zeraki Timetable": { setTarget: number; achievedTarget: number };
}

interface Invoice {
  id: string;
  schoolId: string;
  amountDue: string;
  dueDate: string;
}
interface Collection {
  id: string;
  schoolId: string;
  date: string;
  amount: string;
  status: string;
}
interface SignUpOverview {
  "Zeraki Analytics": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Finance": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Timetable": { Primary: number; Secondary: number; IGCSE: number };
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [targets, setTargets] = useState<Targets>();
  const [collections, setCollections] = useState<Collection[]>();
  const [invoices, setInvoices] = useState<Invoice[]>();
  const [signUps, setSignUps] = useState<SignUpOverview>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("metrics");

  const getMetrics = async () => {
    setLoading(true);
    const response1 = await fetch("http://localhost:3000/collections");
    const response2 = await fetch("http://localhost:3000/signups");
    const response3 = await fetch("http://localhost:3000/revenue");
    const response4 = await fetch("http://localhost:3000/bouncedCheques");

    const collections = await response1.json();
    const signups = await response2.json();
    const revenue = await response3.json();
    const bouncedCheques = await response4.json();

    console.log(collections);

    setMetrics({
      colletions: collections.length,
      total_signups: signups.length,
      revenue: revenue.length,
      bounced_checks: bouncedCheques.length,
    });
    setCurrentItem("metrics");
    setLoading(false);
  };

  const getData = async (item: string) => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/${item}`);
    const data = await response.json();
    switch (item) {
      case "metrics":
        setMetrics(data);
        break;
      case "upcomingInvoices": {
        const sortedInvoices = [...data].sort(
          (a, b) =>
            new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );
        setInvoices(sortedInvoices);
        break;
      }
      case "collections":
        setCollections(data);
        break;
      case "signupsOverview":
        setSignUps(data);
        break;
      default:
        console.log("Invalid item");
    }
    setCurrentItem(item);
    setLoading(false);
  };

  const getTargets = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/targets");
    const data = await response.json();
    setTargets(data);
    setCurrentItem("targets");
    setLoading(false);
  };

  useEffect(() => {
    getMetrics();
  }, []);

  const NavItems = [
    { label: "Metrics", onClick: getMetrics },
    { label: "Targets", onClick: getTargets },
    { label: "Signups", onClick: () => getData("signupsOverview") },
    { label: "Upcoming Invoices", onClick: () => getData("upcomingInvoices") },
    { label: "Collections", onClick: () => getData("collections") },
  ];

  return (
    <>
      <NavList items={NavItems} />
      {loading && <Loading />}

      {!loading && (
        <div id="display">
          {currentItem === "metrics" && metrics && (
            <MetricsTab metrics={metrics} />
          )}
          {currentItem === "targets" && targets && (
            <TargetsCharts targets={targets} />
          )}
          {currentItem === "signupsOverview" && signUps && (
            <SignUpChart signUps={signUps} />
          )}

          {currentItem === "upcomingInvoices" && invoices && (
            <UpcomingInvoices invoices={invoices} />
          )}
          {currentItem === "collections" && collections && (
            <Collections collections={collections} />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
