import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import reportWebVitals from './reportWebVitals';

const RootComponent = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

// Monitoreo de rendimiento
const reportMetrics = () => {
  reportWebVitals(metric => {
    console.log(metric);
  });
};

reportMetrics();

export default RootComponent; 