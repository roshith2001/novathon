import React from 'react';

import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatBubble = ( { message } ) => {

    const [ user ] = useAuthState(auth);
    const isUser = message.uid === user.uid;
   

    return(
        <div className='flex flex-col'>
            
            <div 
                className={`w-3/4 p-2 m-2 rounded-xl bg-third text-secondary
                     flex justify-between items-center ${isUser ? 'self-end' : ''}`}>
                <div className='flex-grow'>
                    <img src={message.avatar} alt={message.name}
                    className='w-8 h-8 rounded-xl inline-block'/>
                    <span className='break-words flex-wrap mx-2'>{ message.text }</span>
                </div> 
                <div>
                    <span className='text-thin text-[10px] self-end'>11:43</span>
                </div>            
            </div>
            
        </div>
    );
}

export default ChatBubble;