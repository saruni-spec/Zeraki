// Define the Collection interface with properties: id, schoolId, date, amount, and status
interface Collection {
  id: string;
  schoolId: string;
  date: string;
  amount: number;
  status: string;
}

// Define a functional React component named Collections
// The component expects a prop named collections which is an array of Collection objects
const Collections = ({ collections }: { collections: Collection[] }) => {
  return (
    // Render a table to display the collection data
    <table>
      <thead>
        <tr>
          {/* Define table headers for each column */}
          <th>ID</th>
          <th>School ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Map over the collections array and render a table row for each collection */}
        {collections.map((collection, index) => (
          // Use the index as the key for each row
          <tr key={index}>
            {/* Render a table cell for each property of the collection object */}
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

// Export the Collections component as the default export
export default Collections;
