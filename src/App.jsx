import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from '@context/UserContext';
import Navbar from '@components/layout/Navbar';
import Landing from '@pages/Landing';
import Channels from '@pages/Channels';
import RestaurantDetail from '@pages/RestaurantDetail';
import Discovery from '@pages/Discovery';
import Profile from '@pages/Profile';
import RestoAgents from '@pages/RestoAgents';
import RestaurantChat from '@pages/RestaurantChat';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/restaurant/:slug" element={<RestaurantDetail />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/agents" element={<RestoAgents />} />
              <Route path="/chat/:slug" element={<RestaurantChat />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;