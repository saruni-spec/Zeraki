import React from "react";
import "../static/nav.css";

interface Collections {
  id: string;
  schoolId: string;
  date: string;
  amount: number;
  status: string;
}
interface CollectionsTableProps {
  Collections: Collections[];
  markValid: (collection: Collections) => void;
  markBounced: (collection: Collections) => void;
}

const CollectionTable: React.FC<CollectionsTableProps> = ({
  Collections,
  markBounced,
  markValid,
}) => {
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
        {Collections.map((collection, index) => (
          <tr key={index}>
            <td>{collection.id}</td>
            <td>{collection.schoolId}</td>
            <td>{collection.date}</td>
            <td>{collection.amount}</td>
            <td>{collection.status}</td>
            <td
              onClick={() => {
                markValid(collection);
              }}
            >
              Mark As Valid
            </td>
            <td
              onClick={() => {
                markBounced(collection);
              }}
            >
              Mark As Bounced
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollectionTable;
