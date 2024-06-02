// Import the loading CSS file to style the loading component
import "../static/loading.css";

// Define a functional React component named Loading
const Loading = () => {
  return (
    // The main container div with a class of "loading"
    <div className="loading">
      {/* These three empty divs will be styled to create the loading animation */}
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

// Export the Loading component as the default export
export default Loading;
