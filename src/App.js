import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';

// import { auth } from "./firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
// import { query, collection, orderBy,
//   onSnapshot, limit } from 'firebase/firestore';
// import { db } from './firebase';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import NavBar from './components/NavBar';

function App() {
  
  return (
    <div className='flex flex-col relative mx-auto h-screen font-heading'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
