import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login-form';
import Register from './components/Register';
import ServiceProviderForm from './components/serviceProvider';
import GalleryForm from './components/gallery';
import Header from './components/headers/headers';
import ServiceProviderProfile from './components/serviceProviderProfile';
import CustomerPage from './components/customerPage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <div className="App">
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/Login-form" element={<LoginForm />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/serviceProvider" element={<ServiceProviderForm />} />
            <Route path='/gallery' element={<GalleryForm />} />
            <Route path='/serviceProviderProfile' element={<ServiceProviderProfile />} />
            <Route path='/customerPage' element={<CustomerPage />} />
          </Routes>
        </div>
      </div>
  );
}

