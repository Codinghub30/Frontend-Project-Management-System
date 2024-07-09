import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './components/store/store'; // Import the Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the App with the Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
