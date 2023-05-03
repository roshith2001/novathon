import React, { useState } from 'react';

import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const InputField = ({scroll}) => {

    const[message, setMessage] = useState("");

    const sendMessage = async(event) => {
        event.preventDefault();
        if(message.trim() === ""){
            return;
        }
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db,"messages"), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
        });
        setMessage("");
        scroll.current.scrollIntoView({behavior: "smooth"});
    };

    return(
        <div className='p-2 fixed bottom-0 flex justify-between items-center 
            w-full sm:w-2/3'>
            <div className=''>
                <IconButton sx={{padding: 1, background: '#A288E3'}}>
                    <CameraAltIcon 
                        sx={{color: '#02182B'}} />
                </IconButton>
            </div>
            <form className='flex w-full'
                onSubmit={(event) => {sendMessage(event)}}>
            <div className=' flex-grow mx-4 bg-secondary
                rounded-xl px-2 flex'>
                <input type='text' 
                    className='outline-none bg-secondary flex-grow'
                    placeholder='Type your message here...'
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                />
                <div>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <KeyboardVoiceIcon />
                </IconButton>
                </div> 
            </div>
            <div className=''>
                <IconButton type='submit' sx={{padding: 1, background: '#A288E3'}}>
                    <SendIcon 
                        sx={{color: '#02182B'}} />
                </IconButton>
            </div>
            </form>
        </div>
    );
}

export default InputField;