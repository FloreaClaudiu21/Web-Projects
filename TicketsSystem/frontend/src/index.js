import React from 'react';
import io from "socket.io-client"
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import Reset from "./components/app/reset"
import Page404 from './components/app/404';
import {Route, BrowserRouter, Routes } from "react-router-dom"

const Client = io("http://localhost:5000")
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route exact path="/resetPassword" element={<Reset />} />
            <Route path="*" element={<Page404 />}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
export default Client;

