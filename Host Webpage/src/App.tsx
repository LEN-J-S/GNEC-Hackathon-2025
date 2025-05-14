import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WindowsInstall from './pages/WindowsInstall';
import AndroidInstall from './pages/AndroidInstall';
import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/windows" element={<Layout><WindowsInstall /></Layout>} />
        <Route path="/android" element={<Layout><AndroidInstall /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;