import React, { useState } from 'react';

import { auth, db, storage } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const InputField = ({scroll}) => {

    const messageRef = collection(db, "messages");
    const[message, setMessage] = useState("");
    const { uid, displayName, photoURL } = auth.currentUser;

    const sendMessage = async(event) => {
        event.preventDefault();
        if(message.trim() === ""){
            return;
        }
        
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

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        const fileRef = ref(storage, `${new Date().toISOString()}-${file.name}`);
        const uploadTask = uploadBytes(fileRef, file);

        await uploadTask;
        const downloadURL = await getDownloadURL(fileRef);

        await addDoc(messageRef, {
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
            file: downloadURL,
        });
    };

    return(
        <div className='p-2 flex justify-between items-center 
            w-full'>
            <div className=''>
                <label htmlFor="file-input">
                    <IconButton component="span" sx={{padding: 1, background: '#A288E3'}}>
                        <AttachFileIcon sx={{color: '#02182B'}} />
                    </IconButton>
                </label>
                <input id="file-input" type="file" multiple={true} 
                    className='hidden' onChange={ handleFileUpload }/>

            </div>
            <form className='flex w-full'
                onSubmit={(event) => {sendMessage(event)}}>
            <div className=' flex-grow mx-4 bg-secondary
                rounded-xl px-2 flex'>
                <input type='text' 
                    className='outline-none w-0 bg-secondary flex-grow'
                    placeholder='Type here...'
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                />
                <div className='flex'>
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