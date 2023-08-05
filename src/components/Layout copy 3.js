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
  const [isRefreshed, setIsRefreshed] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const handleRefresh = () => {
      // Set the flag to indicate the page is being refreshed
      localStorage.setItem('isRefreshed', 'true');
      setIsRefreshed(true);
    };

    const handleBeforeUnload = (event) => {
      if (localStorage.getItem('isRefreshed') !== 'true') {
        // Clear the token only if the page is not being refreshed
        localStorage.removeItem('token');
      }
      localStorage.removeItem('isRefreshed');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleRefresh);

    return () => {
      // Clean up the event listeners when the component unmounts
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleRefresh);
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
