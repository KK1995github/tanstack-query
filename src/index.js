import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// firsttime ese likhna hai
// const queryClient = new QueryClient()

// 2nd time
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:10000,   
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>

  <React.StrictMode>  
    <App />
  </React.StrictMode>
  </QueryClientProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
