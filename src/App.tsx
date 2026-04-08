import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Auth } from './pages/Auth';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Datasets } from './pages/Datasets';
import { Analysis } from './pages/Analysis';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
