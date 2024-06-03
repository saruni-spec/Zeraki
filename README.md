# Zeraki Sales Agent Dashboard

## Overview

The Zeraki Sales Agent Dashboard is a responsive web application developed to facilitate the management of school accounts, invoicing, and collections. This dashboard provides sales agents with comprehensive tools and visualizations to effectively monitor and manage their sales and collection activities. Built with React and Vite, it ensures a robust and scalable solution for Zeraki's internal operations.

## Features

### Side Navigation

- **Dashboard Module**: Displays dynamic counters for Collections, Sign-ups, Total Revenue, and Bounced Cheques.
- **Schools Module**: Lists schools with options to view detailed information, including associated invoices and collections.

### Dashboard Overview

- **Top Card Metrics**: Provides high-level, at-a-glance overviews of key performance indicators.
  - **Collections**: Total number of collections made.
  - **Sign-ups**: Total number of new school sign-ups with a breakdown by product (Zeraki Analytics, Zeraki Finance, and Zeraki Timetable).
  - **Total Revenue**: Overall revenue collected, with details per product.
  - **Bounced Cheques**: Number of bounced cheques.
- **Targets Visualization**: Pie charts representing progress towards signup targets for Zeraki products.
- **Signups Overview**: Bar graphs representing the distribution of sign-ups across different types of schools for each product.
- **Upcoming Invoices**: List of upcoming invoices ordered by due date, with quick actions for payment collection.

### School Management

- **Schools**: Interface to manage and view detailed information on each school.
  - **School Details**: Display includes name, type, products, county, registration date, contact information, and balance.
- **Invoices**: Management of invoices per school with enhanced filtering and CRUD capabilities.
  - **List All Invoices**: Display all invoices associated with a school.
  - **CRUD Operations**: Enable creation, reading, updating, and deletion of invoices.
- **Collections**: Manage collections per school with capabilities to update invoice statuses based on collection outcomes.
  - **List Collections**: Show all collections for each school.

## Technical Requirements

- **Framework**: React with Vite.
- **Data Handling**: Simulate real-time data updates using mock JSON data. Utilize mock APIs to facilitate development without dependency on a backend server. Recommended mock API service: JSON Server.

### Key Design Decisions

#### 1. **Framework Selection: React with Vite**

**Reasoning:**

- **Performance and Development Speed**: React provides a robust component-based architecture, allowing for efficient UI development and state management. Vite, being a build tool that leverages native ES modules, ensures fast cold-starts and HMR (Hot Module Replacement), significantly speeding up development time.
- **Community and Ecosystem**: Both React and Vite have vast communities and extensive ecosystems, providing ample resources, libraries, and tools to enhance development efficiency and application scalability.

#### 2. **Data Handling with Mock JSON Server**

**Reasoning:**

- **Development Flexibility**: Utilizing a mock JSON server allows developers to simulate real-time data updates and interactions without being dependent on a backend server. This approach facilitates frontend development and testing in isolation, ensuring quicker iterations.
- **API Endpoint Simulation**: The mock JSON server provides endpoints that mimic real API responses, enabling developers to work with realistic data structures and interactions.

#### 3. **State Management**

**Reasoning:**

- **Local State with React Hooks**: The application leverages React's `useState` and `useEffect` hooks for local state management and side effects. This approach simplifies state handling within functional components, ensuring a clear and maintainable code structure.
- **Loading Indicators**: State variables like `loading` provide user feedback during data fetching operations, enhancing the user experience by indicating that the application is processing data.

#### 4. **Component-Based Architecture**

**Reasoning:**

- **Reusability and Maintainability**: Breaking down the application into modular components (e.g., `Dashboard`, `Schools`, `Invoices`, `Collections`) ensures that each part of the application is reusable and easier to maintain. This modularity aligns with React's philosophy and promotes clean code practices.
- **Separation of Concerns**: By separating UI components from business logic and data fetching, the codebase becomes more organized and easier to debug or extend.

#### 5. **Dynamic Data Fetching and Filtering**

**Reasoning:**

- **Real-Time Updates**: The functions `getMetrics`, `getSchoolData`, and `fetchData` dynamically fetch data from the mock server, ensuring the dashboard displays up-to-date information. This design decision supports real-time updates and accurate data representation.
- **Filtering Mechanisms**: The `addFilter` function allows for dynamic filtering of invoices and collections based on status. This feature enhances data accessibility and usability, enabling users to quickly locate relevant information.

#### 6. **Interactive Data Visualization**

**Reasoning:**

- **Charts and Graphs**: The application uses pie charts for target visualization and bar graphs for sign-ups overview. These visualizations provide intuitive and interactive ways for users to comprehend complex data at a glance, supporting strategic decision-making.
- **Tooltips and Interactivity**: Incorporating interactive elements like tooltips enhances the user experience by providing additional context and details on hover or click events.

#### 7. **CRUD Operations for Invoices and Collections**

**Reasoning:**

- **Comprehensive Data Management**: The ability to create, read, update, and delete (CRUD) invoices and collections directly from the UI empowers sales agents to manage financial data effectively. This feature is crucial for maintaining accurate financial records and ensuring operational efficiency.
- **Automated Invoice Number Generation**: The `generateNumber` function automates the creation of unique invoice numbers, streamlining the invoicing process and reducing the potential for human error.

#### 8. **Form Handling for Payments and Invoices**

**Reasoning:**

- **User-Friendly Forms**: The application includes forms for creating invoices and recording payments. These forms are designed to be user-friendly, guiding sales agents through the necessary steps to enter data accurately.
- **Status Updates**: Upon payment collection, the application updates invoice statuses, ensuring the financial data remains consistent and up-to-date.

### Mock JSON Data Structure

**Reasoning:**

- **Realistic Simulation**: The mock JSON data is structured to closely resemble the expected real-world data, including fields like `id`, `schoolId`, `amount`, `status`, and `dueDate`. This realistic simulation helps in testing and validating the application's functionality.
- **Comprehensive Coverage**: The data covers various aspects such as schools, invoices, collections, sign-ups, revenue, and targets. This comprehensive coverage ensures that all features of the dashboard can be thoroughly tested.

```json
{
  "schools": [
    {
      "id": "1",
      "name": "School A",
      "type": "Primary",
      "county": "County X",
      "registrationDate": "2023-01-01",
      "contactInformation": "contact@schoola.edu",
      "balance": 5000
    },
    ...
  ],
  "invoices": [
    {
      "id": "INV-1",
      "schoolId": "1",
      "invoiceNumber": "INV-123456",
      "invoiceItem": "Zeraki Analytics",
      "creationDate": "2023-05-01",
      "dueDate": "2023-06-01",
      "amount": 1000,
      "paidAmount": 500,
      "balance": 500,
      "status": "Pending",
      "daysUntilDue": 30
    },
    ...
  ],
  "collections": [
    {
      "id": "COL-1",
      "schoolId": "1",
      "date": "2023-05-10",
      "amount": 500,
      "status": "Valid"
    },
    ...
  ],
  "signups": [
    ...
  ],
  "revenue": {
    "total": 10000,
    "byProduct": {
      "Zeraki Analytics": 4000,
      "Zeraki Finance": 3000,
      "Zeraki Timetable": 3000
    }
  },
  "bouncedCheques": [
    ...
  ],
  "targets": {
    ...
  },
  "signupsOverview": [
    ...
  ]
}
```

### Conclusion

The design decisions for the Zeraki Sales Agent Dashboard are driven by the need for a performant, user-friendly, and maintainable application. By leveraging modern frameworks, modular architecture, and realistic data simulations, the dashboard effectively meets the operational requirements of sales agents, enhancing their ability to manage school accounts, invoicing, and collections.

## Getting Started

### Prerequisites

- Node.js (latest stable version)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saruni-spec/Zeraki.git
   cd Zeraki
   ```
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the JSON Server:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Project Structure

- `src/`: Contains all the source code for the application.
  - `components/`: Reusable components such as navigation bars, cards, charts, etc.
  - `pages/`: Different pages of the application (e.g., Dashboard, Schools).
  - `services/`: API service files for data fetching and handling.
  - `static/`: CSS or styled-components for styling the application.
  - `App.tsx`: Main application component.

### Key Components

- **Dashboard**: Displays metrics, targets, signups overview, and upcoming invoices.
- **Schools**: Manages school details, invoices, and collections.

### API Endpoints (Mock)

- **All Data**: `https://json-s.netlify.app`
- **Invoices**: `http://localhost:3000/invoices`
- **Collections**: `http://localhost:3000/collections`
- **Signups**: `http://localhost:3000/signups`
- **Revenue**: `http://localhost:3000/revenue`
- **Bounced Cheques**: `http://localhost:3000/bouncedCheques`
- **Targets**: `http://localhost:3000/targets`
- **Signups Overview**: `http://localhost:3000/signupsOverview`

### On WEBSITE https://main--zeraki-saruni.netlify.app/

- **All Data**: `https://json-s.netlify.app/db/json`
  The API is hosted on netlify as a static API.
  Only rad operations function.

  ### The Mock Data is available in the root dir,db.json file

### Key Functions

- `getSchools()`: Fetches and sets the list of schools.
- `getSchoolData(schoolId: string)`: Fetches and sets invoices and collections for a specific school.
- `saveInvoice(newInvoice: Invoices)`: Saves a new invoice to the server.
- `savePayment(newPayment: Collections)`: Saves a new payment to the server.
- `markValid(collection: Collections)`: Marks a collection as valid.
- `markBounced(collection: Collections)`: Marks a collection as bounced.
- `deleteInvoice(invoice: Invoices)`: Deletes an invoice.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to the Zeraki team for their support and contributions.

---

For any questions or issues, please contact the project maintainer at [smithsaruni16@gmail.com.com].
