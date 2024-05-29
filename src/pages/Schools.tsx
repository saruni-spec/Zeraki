import { useState } from "react";
import "../static/nav.css";
interface Schools {
  name: string;
  type: string;
  product: string;
  county: string;
  registration_date: string;
  contact: string;
  invoices?: {};
  collections?: {};
}

interface Invoices {
  invoice_number: number;
  invoice_item: string;
  created_date: string;
  due_date: string;
  amount: number;
  paid_amount: number;
  days_until_due: number;
  status: string;
}

const Schools = () => {
  const [schools, setSchools] = useState<Schools>();

  const [invoices, setInvoices] = useState<Invoices>();
  const [collections, setCollections] = useState<Invoices>();

  return (
    <ul className="nav">
      <li>Schools</li>
      <li>Invoices</li>
      <li>Collectons</li>
    </ul>
  );
};

export default Schools;
