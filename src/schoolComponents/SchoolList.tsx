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
interface SchoolListProps {
  schools: Schools[];
  viewSchoolDetails: (school: Schools) => void;
}

const SchoolList: React.FC<SchoolListProps> = ({
  schools,
  viewSchoolDetails,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>

          <th>County</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {schools.map((school, index) => (
          <tr
            key={index}
            onClick={() => {
              viewSchoolDetails(school);
            }}
          >
            <td>{school.name}</td>
            <td>{school.type}</td>

            <td>{school.county}</td>
            <td>{school.contactInformation.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SchoolList;
