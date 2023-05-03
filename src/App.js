import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { query, collection, orderBy,
  onSnapshot, limit, QuerySnapshot } from 'firebase/firestore';
import { db } from './firebase';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import NavBar from './components/NavBar';
import SignInScreen from './components/SignInScreen';
import InputField from './components/InputField';
import ChatField from './components/ChatField';

function App() {
  const [ user ] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const handleSignOut = () => {
    auth.signOut();
  }


  

    useEffect(() => {
        const q = query(
            collection(db,'messages'),
            orderBy("createdAt"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            setMessages(messages);
        });
        return () => unsubscribe;
    }, []);


  return (
    <div className='flex flex-col sm:w-2/3 
      mx-auto h-screen font-heading'>
      <NavBar userState={user} 
        signIn={handleSignIn}
        signOut={handleSignOut}
        />
      {user ? <div>
        <ChatField className="flex-grow" message={messages}/>
        <span ref={ scroll }></span>
        <InputField scroll={scroll}/>
        </div>
        :
        <SignInScreen signIn={handleSignIn}/>}
    </div>
  );
}

export default App;
