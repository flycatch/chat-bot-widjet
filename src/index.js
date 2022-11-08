import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Find all widget divs
const widgetDivs = document.querySelectorAll('.nicoraynaud-finance-widget');
// Inject our React App into each class
widgetDivs.forEach(div => {
  const root = ReactDOM.createRoot(div);
  root.render(
      <React.StrictMode>
        <App symbol={div.dataset.symbol}/>
      </React.StrictMode>
    );
});
