import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
// import Resources from '../pages/resources/Resources';
// import Contracts from '../pages/contracts/Contracts';
// import TimeSheets from '../pages/timesheets/TimeSheets';
import Companies from '../pages/companies/Companies';
import Dashboard from '../pages/dashboard/Dashboard';
// import AddressBook from '../pages/addressbook/AddressBook';
import TestingHeader from "./header/TestingHeader";
import AllNotification from './header/AllNotification';
// import Admin from "../pages/adminsetting/Admin"
import { TitleProvider } from './header/TitleContext';
// import Charts from '../pages/charts/Charts';

function Layout() {
  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return <Navigate to="/login"/>;
  }
 
  return (
    <div className="company-color-bg">
      <>
        <TitleProvider>
          <Sidebar>
            <TestingHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Routes>
              <Route index element={<Dashboard />} />
c              {/* <Route path="/resources" element={<Resources />} /> */}
              {/* <Route path="/contracts" element={<Contracts />} /> */}
              {/* <Route path="/timesheets" element={<TimeSheets />} /> */}
              <Route path="/companies" element={<Companies />} />
              <Route path="/allNotification" element={<AllNotification />} />
              {/* <Route path="/charts" element={<Charts />} /> */}
              {/* <Route path="/adminsetting" element={<AdminSetting />} /> */}
              {/* <Route path="/admin" element={<Admin />} /> */}
            </Routes>
          </Sidebar>
        </TitleProvider>
      </>
    </div>
  );
}

export default Layout;
