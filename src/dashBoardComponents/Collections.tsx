interface Collection {
  id: string;
  schoolId: string;
  date: string;
  amount: string;
  status: string;
}

const Collections = ({ collections }: { collections: Collection[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>School ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {collections.map((collection, index) => (
          <tr key={index}>
            <td>{collection.id}</td>
            <td>{collection.schoolId}</td>
            <td>{collection.date}</td>
            <td>{collection.amount}</td>
            <td>{collection.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Collections;
