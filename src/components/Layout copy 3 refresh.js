import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Companies from '../pages/companies/Companies';
import Dashboard from '../pages/dashboard/Dashboard';
import { TitleProvider } from './header/TitleContext';
import TestingHeader from './header/TestingHeader';
import AllNotification from './header/AllNotification';

function Layout() {
  const [searchTerm, setSearchTerm] = useState('');

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const handleUnload = () => {
      // Clear the token when the user closes the entire browser
      localStorage.removeItem('token');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="company-color-bg">
      <>
        <TitleProvider>
          <Sidebar>
            <TestingHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/allNotification" element={<AllNotification />} />
            </Routes>
          </Sidebar>
        </TitleProvider>
      </>
    </div>
  );
}

export default Layout;
