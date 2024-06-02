import React from "react";
import "../static/nav.css";

interface Schools {
  id: string;
  name: string;
  type: string;
  products: string;
  county: string;
  registrationDate: string;
  contactInformation: { phone: string; email: string };
}
interface SchoolDetailsProps {
  className: string;
  selectedSchool: Schools;
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({
  selectedSchool,
  className,
}) => {
  return (
    <div id={"schoolDetails"} className={className}>
      <h2>
        {selectedSchool.name} : {selectedSchool.id}
      </h2>

      <p>Registration Date :{selectedSchool.registrationDate}</p>

      <p>{selectedSchool.type}</p>
      <h3>Contact Info</h3>
      <p>{selectedSchool.county}</p>
      <p>{selectedSchool.contactInformation.email}</p>
      <p>{selectedSchool.contactInformation.phone}</p>
      <h3>Products</h3>
      <p>{selectedSchool.products}</p>
    </div>
  );
};

export default SchoolDetails;
