import { useEffect, useState } from "react";
import "../static/nav.css";
import NavList from "../components/Nav";

import TargetsCharts from "../dashBoardComponents/TargetsCharts";
import SignUpChart from "../dashBoardComponents/SignUpOverview";
import UpcomingInvoices from "../dashBoardComponents/UpcomingInvoices";
import Collections from "../dashBoardComponents/Collections";
import MetricsTab from "../dashBoardComponents/Metrics";
import Loading from "../components/Loading";

// Define interfaces for various data structures used in the dashboard
interface Metrics {
  colletions: number;
  total_signups: number;
  revenue: Revenue[];
  bounced_checks: number;
}

interface Revenue {
  product: string;
  amount: number;
  id: string;
}

interface Targets {
  "Zeraki Analytics": { setTarget: number; achievedTarget: number };
  "Zeraki Finance": { setTarget: number; achievedTarget: number };
  "Zeraki Timetable": { setTarget: number; achievedTarget: number };
}

interface Invoice {
  id: string;
  schoolId: string;
  invoiceNumber: string;
  invoiceItem: string;
  creationDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balance: number;
  status: string;
}

interface Collection {
  id: string;
  schoolId: string;
  date: string;
  amount: number;
  status: string;
}

interface SignUpOverview {
  "Zeraki Analytics": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Finance": { Primary: number; Secondary: number; IGCSE: number };
  "Zeraki Timetable": { Primary: number; Secondary: number; IGCSE: number };
}

const Dashboard = () => {
  // Define state variables for the dashboard
  const [metrics, setMetrics] = useState<Metrics>();
  const [targets, setTargets] = useState<Targets>();
  const [collections, setCollections] = useState<Collection[]>();
  const [invoices, setInvoices] = useState<Invoice[]>();
  const [signUps, setSignUps] = useState<SignUpOverview>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("metrics");
  const [active, setActive] = useState<number | undefined>(undefined);

  // Function to fetch metrics data from the server
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
      revenue: revenue,
      bounced_checks: bouncedCheques.length,
    });
    setCurrentItem("metrics");
    setLoading(false);
  };

  // Generic function to fetch different types of data based on the item parameter
  const getData = async (item: string) => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/${item}`);
    const data = await response.json();
    switch (item) {
      case "metrics":
        setMetrics(data);
        break;
      case "invoices": {
        const allInvoices = data;
        const UpcomingInvoices = allInvoices.filter(
          (invoice: Invoice) => invoice.status !== "Completed"
        );

        const sortedInvoices = [...UpcomingInvoices].sort(
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

  // Function to fetch targets data from the server
  const getTargets = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/targets");
    const data = await response.json();
    setTargets(data);
    setCurrentItem("targets");
    setLoading(false);
  };

  // useEffect hook to fetch data based on the current item selected
  useEffect(() => {
    switch (currentItem) {
      case "metrics":
        getMetrics();
        setActive(0);
        break;
      case "targets":
        getTargets();
        setActive(1);
        break;
      case "signupsOverview":
        getData("signupsOverview");
        setActive(2);
        break;
      case "invoices":
        getData("invoices");
        setActive(3);
        break;
      case "collections":
        getData("collections");
        setActive(4);
        break;
      default:
        break;
    }
  }, [currentItem]);

  // Navigation items for the dashboard
  const NavItems = [
    { label: "Metrics OverView", onClick: getMetrics },
    { label: "Targets", onClick: getTargets },
    { label: "Signups", onClick: () => getData("signupsOverview") },
    { label: "Upcoming Invoices", onClick: () => getData("invoices") },
    { label: "Collections", onClick: () => getData("collections") },
  ];

  return (
    <>
      <NavList items={NavItems} active={active} />
      {loading && <Loading />}

      {!loading && (
        <div id="display">
          {currentItem === "metrics" && metrics && (
            <MetricsTab metrics={metrics} setCurrentItem={setCurrentItem} />
          )}
          {currentItem === "targets" && targets && (
            <TargetsCharts targets={targets} />
          )}
          {currentItem === "signupsOverview" && signUps && (
            <SignUpChart signUps={signUps} />
          )}
          {currentItem === "invoices" && invoices && (
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
