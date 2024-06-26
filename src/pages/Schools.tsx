import { useEffect, useState } from "react";
import "../static/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faRotateLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import NavList from "../components/Nav";
import SchoolList from "../schoolComponents/SchoolList";
import Filter from "../schoolComponents/Filter";
import InvoiceTable from "../schoolComponents/Invoices";
import CollectionTable from "../schoolComponents/Collections";
import InvoiceForm from "../schoolComponents/InvoiceForm";
import PaymentForm from "../schoolComponents/PaymentForm";
import SchoolDetails from "../schoolComponents/SchoolDetails";
import Loading from "../components/Loading";

// Define the structure of the data used in the component
interface Schools {
  id: string;
  name: string;
  type: string;
  products: string;
  county: string;
  registrationDate: string;
  contactInformation: { phone: string; email: string };
}

interface Invoices {
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
interface Collections {
  id: string;
  schoolId: string;
  date: string;
  amount: number;
  status: string;
}

const Schools = () => {
  // Define state variables
  const [schools, setSchools] = useState<Schools[]>();
  const [invoices, setInvoices] = useState<Invoices[]>();
  const [collections, setCollections] = useState<Collections[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("schools");
  const [selectedSchool, setSelectedSchool] = useState<Schools>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoices[]>();
  const [filteredCollections, setFilteredCollections] =
    useState<Collections[]>();

  // Fetch the list of schools when the component mounts
  useEffect(() => {
    getSchools();
  }, []);

  // Fetch the list of schools from the server
  const getSchools = async () => {
    setLoading(true);
    const response = await fetch("https://json-s.netlify.app/db.json");
    const data = await response.json();
    setSchools(data.schools);
    setCurrentItem("schools");
    setLoading(false);
  };

  // Fetch invoices and collections for a specific school
  const getSchoolData = async (schoolId: string) => {
    setLoading(true);
    const response = await fetch("https://json-s.netlify.app/db.json");
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();

    const allInvoices = data.invoices;
    const allCollections = data.collections;

    const schoolInvoices = allInvoices.filter(
      (invoice: Invoices) => invoice.schoolId === schoolId
    );
    const schoolCollections = allCollections.filter(
      (collection: Collections) => collection.schoolId === schoolId
    );

    setInvoices(schoolInvoices);
    setFilteredInvoices(schoolInvoices);
    setFilteredCollections(schoolCollections);
    setCollections(schoolCollections);

    setLoading(false);
  };

  // Fetch all invoices and collections and filter them based on the selected school
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`https://json-s.netlify.app/db.json`);

    const data = await response.json();

    const allInvoices = data.invoices;
    const allCollections = data.collections;

    if (selectedSchool) {
      const schoolId = selectedSchool.id;
      const schoolInvoices = allInvoices.filter(
        (invoice: Invoices) => invoice.schoolId === schoolId
      );
      const schoolCollections = allCollections.filter(
        (collection: Collections) => collection.schoolId === schoolId
      );

      setInvoices(schoolInvoices);
      setFilteredInvoices(schoolInvoices);
      setFilteredCollections(schoolCollections);
      setCollections(schoolCollections);
    }

    setLoading(false);
  };

  // View details for a selected school
  const viewSchoolDetails = (school: Schools) => {
    setSelectedSchool(school);
    getSchoolData(school.id);
    setShowDetails(true);
  };

  // Add filter to the invoices or collections based on the current view
  const addFilter = (filter: string) => {
    let data;
    let filteredData;

    if (currentItem === "invoices") {
      if (filter === "All") return setFilteredInvoices(invoices);

      data = invoices;
      filteredData = data?.filter((item) => item.status === filter);

      setFilteredInvoices(filteredData);
    }
    if (currentItem === "collections") {
      if (filter === "All") return setFilteredCollections(collections);
      data = collections;
      filteredData = data?.filter((item) => item.status === filter);
      setFilteredCollections(filteredData);
    }
  };

  const [invoiceForm, showInvoiceForm] = useState<boolean>(false);

  // Save a new invoice to the server
  const saveInvoice = async (newInvoice: Invoices) => {
    const response = await fetch("https://json-s.netlify.app/db.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvoice),
    });

    if (response.ok) {
      alert("Invoice saved successfully");
      fetchData();
    } else {
      alert("Error saving invoice, Using Static API");
    }
  };

  // Generate a random invoice number
  const generateNumber = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  // Handle invoice creation form submission
  const InvoiceCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!selectedSchool) return;
    e.preventDefault();
    const form = e.currentTarget;

    const invoiceItem = form.invoiceItem.value;
    const dueDate = form.date.value;
    const amount = parseInt(form.amount.value);
    const schoolId = selectedSchool?.id;
    const invoiceNumber = "INV-" + generateNumber().toString();
    const id = generateNumber().toString();
    const creationDate = new Date().toISOString().split("T")[0];
    const paidAmount = 0;
    const balance = amount - paidAmount;
    const daysUntilDue = 0;
    const status = daysUntilDue > 0 ? "Pending" : "Overdue";

    const newInvoice = {
      id,
      schoolId,
      invoiceNumber,
      invoiceItem,
      creationDate,
      dueDate,
      amount,
      paidAmount,
      balance,
      daysUntilDue,
      status,
    };

    saveInvoice(newInvoice);
  };

  const [paymentForm, showPaymentForm] = useState<boolean>(false);

  // Save a new payment to the server
  const savePayment = async (newPayment: Collections) => {
    const response = await fetch("https://json-s.netlify.app/db.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayment),
    });

    if (response.ok) {
      alert("Payment saved successfully");
      fetchData();
    } else {
      alert("Error saving payment,using Static API");
    }
  };

  // Update an existing invoice on the server
  const updateInvoice = async (invoice: Invoices) => {
    const response = await fetch(
      `http://localhost:3000/invoices/${invoice.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      }
    );

    if (response.ok) {
      alert("Invoice updated successfully");
      fetchData();
    } else {
      alert("Error updating invoice, Using Static API");
    }
  };

  // Handle payment creation form submission
  const PaymentCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!selectedSchool) return;
    e.preventDefault();
    const form = e.currentTarget;

    const date = form.date.value;
    const amount = parseInt(form.amount.value);
    const schoolId = selectedSchool?.id;
    const id = generateNumber().toString();
    const status = "Valid";

    const newPayment = {
      id,
      schoolId,
      date,
      amount,
      status,
    };
    const invoice = invoices?.find((invoice) => invoice.schoolId === schoolId);
    if (invoice) {
      invoice.paidAmount += amount;
      invoice.balance -= amount;
      invoice.status = invoice.balance > 0 ? "Pending" : "Completed";
      updateInvoice(invoice);
    }

    savePayment(newPayment);
  };

  // Mark a collection as valid
  const markValid = async (collection: Collections) => {
    collection.status = "Valid";
    const response = await fetch(`https://json-s.netlify.app/db.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });

    if (response.ok) {
      alert("Collection updated successfully");
      fetchData();
    } else {
      alert("Error updating collection, Using Static API");
    }
  };

  // Mark a collection as bounced
  const markBounced = async (collection: Collections) => {
    collection.status = "Bounced";
    const response = await fetch(`https://json-s.netlify.app/db.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });

    if (response.ok) {
      alert("Collection updated successfully");
      fetchData();
    } else {
      alert("Error updating collection, Using Static API");
    }
  };

  // Delete an invoice
  const deleteInvoice = async (invoice: Invoices) => {
    if (
      window.confirm(
        `Are you sure you want to delete this invoice?${invoice.id}`
      )
    ) {
      const response = await fetch(`https://json-s.netlify.app/db.json`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        alert("Invoice deleted successfully");
        fetchData();
      } else {
        alert("Error deleting invoice, Using Static API");
      }
    }
  };

  const NavItems = [{ label: "Schools", onClick: getSchools }];

  return (
    <>
      <NavList items={NavItems} />
      {loading && <Loading />}
      {!loading && (
        <div id="display">
          {currentItem === "schools" && schools && (
            <SchoolList
              schools={schools}
              viewSchoolDetails={viewSchoolDetails}
            />
          )}
          {currentItem !== "schools" && (
            <div id="headerDiv">
              <h3
                className="headerNav"
                onClick={() => {
                  setCurrentItem("invoices");
                }}
              >
                Invoices
              </h3>
              <h3
                className="headerNav"
                onClick={() => {
                  setCurrentItem("collections");
                }}
              >
                Collections
              </h3>
            </div>
          )}

          {currentItem === "invoices" && invoices && selectedSchool && (
            <>
              <button
                type="button"
                id="addInvoice"
                onClick={() => {
                  showInvoiceForm(true);
                }}
              >
                Add Invoice
              </button>
              <h4>Invoices</h4>
              <Filter
                filterItems={[
                  { label: "All", addFilter: addFilter },
                  { label: "Completed", addFilter: addFilter },
                  { label: "Pending", addFilter: addFilter },
                  { label: "Overdue", addFilter: addFilter },
                ]}
              />
              <InvoiceTable
                Invoices={filteredInvoices ? filteredInvoices : invoices}
                showPaymentForm={showPaymentForm}
                deleteInvoice={deleteInvoice}
              />
              {invoiceForm && (
                <InvoiceForm
                  InvoiceCreation={InvoiceCreation}
                  showInvoiceForm={showInvoiceForm}
                />
              )}
              {paymentForm && (
                <PaymentForm
                  PaymentCreation={PaymentCreation}
                  showPaymentForm={showPaymentForm}
                />
              )}
            </>
          )}
          {currentItem === "collections" && collections && (
            <>
              <h4>Collections</h4>
              <Filter
                filterItems={[
                  { label: "All", addFilter: () => addFilter("All") },
                  { label: "Valid", addFilter: () => addFilter("Valid") },
                  { label: "Bounced", addFilter: () => addFilter("Bounced") },
                ]}
              />
              <CollectionTable
                Collections={
                  filteredCollections ? filteredCollections : collections
                }
                markValid={markValid}
                markBounced={markBounced}
              />
            </>
          )}
          {selectedSchool && (
            <button
              id="openDetails"
              type="button"
              className="noTextButton"
              onClick={() => {
                setShowDetails(true);
              }}
            >
              <p>Show</p>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          )}

          {selectedSchool && (
            <>
              {showDetails && (
                <div id="detailButtons">
                  <button
                    type="button"
                    title="Close Details"
                    className="noTextButton"
                    onClick={() => {
                      setShowDetails(false);
                    }}
                  >
                    <p>Close</p>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                  <button
                    type="button"
                    title="Show Invoice Details"
                    className="noTextButton"
                    onClick={() => {
                      setCurrentItem("invoices");
                    }}
                  >
                    <p> Show More Details</p>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  </button>
                </div>
              )}

              <SchoolDetails
                selectedSchool={selectedSchool}
                className={showDetails ? "shift-details-left" : ""}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Schools;

/*When using local host and a json server

 // Fetch the list of schools from the server
  const getSchools = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/schools");
    const data = await response.json();
    setSchools(data);
    setCurrentItem("schools");
    setLoading(false);
  };

  // Fetch invoices and collections for a specific school
  const getSchoolData = async (schoolId: string) => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/invoices`);
    const response2 = await fetch(`http://localhost:3000/collections`);

    const allInvoices = await response.json();
    const allCollections = await response2.json();

    const schoolInvoices = allInvoices.filter(
      (invoice: Invoices) => invoice.schoolId === schoolId
    );
    const schoolCollections = allCollections.filter(
      (collection: Collections) => collection.schoolId === schoolId
    );

    setInvoices(schoolInvoices);
    setFilteredInvoices(schoolInvoices);
    setFilteredCollections(schoolCollections);
    setCollections(schoolCollections);

    setLoading(false);
  };

  // Fetch all invoices and collections and filter them based on the selected school
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/invoices`);
    const response2 = await fetch(`http://localhost:3000/collections`);

    const allInvoices = await response.json();
    const allCollections = await response2.json();

    if (selectedSchool) {
      const schoolId = selectedSchool.id;
      const schoolInvoices = allInvoices.filter(
        (invoice: Invoices) => invoice.schoolId === schoolId
      );
      const schoolCollections = allCollections.filter(
        (collection: Collections) => collection.schoolId === schoolId
      );

      setInvoices(schoolInvoices);
      setFilteredInvoices(schoolInvoices);
      setFilteredCollections(schoolCollections);
      setCollections(schoolCollections);
    }

    setLoading(false);

  };

   // Save a new invoice to the server
  const saveInvoice = async (newInvoice: Invoices) => {
    const response = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvoice),
    });

    if (response.ok) {
      alert("Invoice saved successfully");
      fetchData();
    } else {
      alert("Error saving invoice");
    }
  };


  // Save a new payment to the server
  const savePayment = async (newPayment: Collections) => {
    const response = await fetch("http://localhost:3000/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayment),
    });

    if (response.ok) {
      alert("Payment saved successfully");
      fetchData();
    } else {
      alert("Error saving payment");
    }
  };

  // Update an existing invoice on the server
  const updateInvoice = async (invoice: Invoices) => {
    const response = await fetch(
      `http://localhost:3000/invoices/${invoice.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      }
    );

    if (response.ok) {
      alert("Invoice updated successfully");
      fetchData();
    } else {
      alert("Error updating invoice");
    }
  };

  // Mark a collection as valid
  const markValid = async (collection: Collections) => {
    collection.status = "Valid";
    const response = await fetch(
      `http://localhost:3000/collections/${collection.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      }
    );

    if (response.ok) {
      alert("Collection updated successfully");
      fetchData();
    } else {
      alert("Error updating collection");
    }
  };

  // Mark a collection as bounced
  const markBounced = async (collection: Collections) => {
    collection.status = "Bounced";
    const response = await fetch(
      `http://localhost:3000/collections/${collection.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      }
    );

    if (response.ok) {
      alert("Collection updated successfully");
      fetchData();
    } else {
      alert("Error updating collection");
    }
  };

  // Delete an invoice
  const deleteInvoice = async (invoice: Invoices) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      const response = await fetch(
        `http://localhost:3000/invoices/${invoice.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        alert("Invoice deleted successfully");
        fetchData();
      } else {
        alert("Error deleting invoice");
      }
    }
  };

*/
