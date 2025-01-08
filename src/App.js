import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Filter from './components/Filter'; 
import TopBar from './components/TopBar';
import Stockpage from './components/Stockpage';
import Cryptopage from './components/Cryptopage';
import Insurancepage from './components/Insurancepage';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '90px' }}>
          <TopBar />
          <Routes>
            <Route path="/" element={<Insurancepage />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/stock" element={<Stockpage />} />
            <Route path="/crypto" element={<Cryptopage />} />
            <Route path="/insurance" element={<Insurancepage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
