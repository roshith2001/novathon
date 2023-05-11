import React from 'react';

import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatBubble = ( { message } ) => {

    const [ user ] = useAuthState(auth);
    const isUser = message.uid === user.uid;
    
   

    return(
        <div className={`w-full my-4 flex ${isUser ? 'justify-end' : 'justify-start'} items-center`}>
                <div 
                    className={`flex flex-col ${isUser ? 'bg-third' : 'bg-primary'} p-2 text-secondary
                    w-4/6 rounded-xl break-normal hyphens-auto`}  
                >
                    <div className={`font-black ${isUser ? 'text-primary' : 'text-third'}`}>
                        {message.name}
                    </div>
                    <div className='flex items-center overflow-hidden'>
                        <img src={message.avatar} alt={message.name} 
                        className='w-8 rounded-xl'/>
                        {message.file ? 
                            <a href={message.file} target="blank">
                                <img src={message.file} 
                                    alt='Uploaded' 
                                    className='mx-2 h-56'/>
                            </a> : 
                            <p className='mx-2'>{message.text}</p>}
                    </div>
                </div>
            </div>
    );
}

export default ChatBubble;