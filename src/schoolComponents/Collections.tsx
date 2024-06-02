import React from "react";
import "../static/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

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
    <table className="tableMargin">
      <thead>
        <tr>
          <th>ID</th>
          <th>School ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Mark as Valid</th>
          <th>Mark as Bounced</th>
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
              className="markStatus"
              onClick={() => {
                markValid(collection);
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </td>
            <td
              className="markStatus"
              onClick={() => {
                markBounced(collection);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollectionTable;
