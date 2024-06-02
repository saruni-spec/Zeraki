interface Invoice {
  id: string;
  schoolId: string;
  amountDue: string;
  dueDate: string;
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
            <td>{invoice.amountDue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpcomingInvoices;
