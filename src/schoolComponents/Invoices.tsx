import React from "react";
import "../static/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
interface InvoiceTableProps {
  Invoices: Invoice[];
  showPaymentForm: (show: boolean) => void;
  deleteInvoice: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  Invoices,
  showPaymentForm,
  deleteInvoice,
}) => {
  return (
    <table className="tableMargin">
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
            <td>
              {Math.ceil(
                (new Date(invoice.dueDate).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </td>
            <td>{invoice.status}</td>
            <td
              title="delete this invoice"
              className="markStatus"
              onClick={(event) => {
                event.stopPropagation();
                deleteInvoice(invoice);
              }}
            >
              Delete Invoice <FontAwesomeIcon icon={faTrash} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
