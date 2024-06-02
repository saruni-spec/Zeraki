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

const UpcomingInvoices = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>School ID</th>
          <th>Due Date</th>
          <th>Amount Due</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <tr key={index}>
            <td>{invoice.id}</td>
            <td>{invoice.schoolId}</td>
            <td>{invoice.dueDate}</td>
            <td>{invoice.amount - invoice.paidAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpcomingInvoices;
