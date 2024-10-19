import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import JobForm from './components/JobForm';
import SignUpForm from './components/SignUpForm';
import OtpVerification from './components/OtpVerification';
import HomeScreen from './components/HomeScreen';
import { useAuthContext } from './context/AuthContext';


function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={user ? <HomeScreen /> : <SignUpForm />} />
          <Route path="/otp-verification" element={user ? <HomeScreen /> : <OtpVerification />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/create-job" element={<JobForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
