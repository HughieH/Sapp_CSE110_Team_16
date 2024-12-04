import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar'
import PageContainer from './PageContainer'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MemoryRouter>
    <React.StrictMode>
      <div className="flex">
        <PageContainer/>
      </div>
    </React.StrictMode>
  </MemoryRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
