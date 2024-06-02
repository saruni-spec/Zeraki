import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../static/nav.css";

interface InvoiceFormProps {
  showInvoiceForm: (show: boolean) => void;
  InvoiceCreation: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  InvoiceCreation,
  showInvoiceForm,
}) => {
  return (
    <form id="invoiceForm" onSubmit={InvoiceCreation}>
      <h4>Invoice Information</h4>

      <button
        type="button"
        id="closeInvoiceForm"
        className="noTextButton"
        onClick={() => {
          showInvoiceForm(false);
        }}
      >
        <p>Close</p>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <label>
        Invoice Item
        <select name="invoiceItem">
          <option value="Zeraki Analytics">Zeraki Analytics</option>
          <option value="Zeraki Finance">Finance</option>
          <option value="Zeraki Timetable">Timetable</option>
        </select>
      </label>
      <label>
        Due Date
        <input name="date" type="date" />
      </label>
      <label>
        Amount
        <input name="amount" type="number" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InvoiceForm;
