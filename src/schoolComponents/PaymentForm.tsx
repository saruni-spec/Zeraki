import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../static/nav.css";

interface PaymentFormProps {
  showPaymentForm: (show: boolean) => void;
  PaymentCreation: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  PaymentCreation,
  showPaymentForm,
}) => {
  return (
    <form id="paymentForm" onSubmit={PaymentCreation}>
      <h4>Payment Information</h4>

      <button
        type="button"
        id="closePaymentForm"
        className="noTextButton"
        onClick={() => {
          showPaymentForm(false);
        }}
      >
        <p>Close</p>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <label>
        Payment Date
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

export default PaymentForm;
