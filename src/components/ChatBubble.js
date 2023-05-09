import React from 'react';

import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatBubble = ( { message } ) => {

    const [ user ] = useAuthState(auth);
    const isUser = message.uid === user.uid;
    
   

    return(
        <div className={`w-full my-4 flex ${isUser ? 'justify-end' : 'justify-start'} items-center`}>
                <div 
                    className='flex flex-col bg-third p-2 text-secondary
                    w-4/6 rounded-xl'
                >
                    <div className='font-black text-primary'>{message.name}</div>
                    <div className='flex items-center overflow-hidden'>
                        <img src={message.avatar} alt={message.name} 
                        className='w-8 rounded-xl'/>
                        <p className='mx-2 hyphens-auto'>{message.text}</p>
                    </div>
                </div>
            </div>
    );
}

export default ChatBubble;