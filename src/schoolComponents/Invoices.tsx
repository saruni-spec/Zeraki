import React from "react";
import "../static/nav.css";

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
  daysUntilDue: number;
  status: string;
}
interface InvoiceTableProps {
  Invoices: Invoice[];
  showPaymentForm: (show: boolean) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  Invoices,
  showPaymentForm,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Invoice Number</th>
          <th>Invoice Item</th>
          <th>Created Date</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Paid Amount</th>
          <th>Days Until Due</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Invoices.map((invoice, index) => (
          <tr
            key={index}
            onClick={() => {
              showPaymentForm(true);
            }}
          >
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.invoiceItem}</td>
            <td>{invoice.creationDate}</td>
            <td>{invoice.dueDate}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.paidAmount}</td>
            <td>{invoice.daysUntilDue}</td>
            <td>{invoice.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
