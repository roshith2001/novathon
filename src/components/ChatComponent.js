import React, { useEffect, useState } from 'react';
import ChatField from './ChatField';
import Navbar from './NavBar';
import InputField from './InputField';
import axios from 'axios';

const ChatComponent = () => {
    const [messages, setMessages] = useState([
        { id: '1', name: 'Mimiona', text: 'Buddy' },
    ]);
    const PUBLIC_URL = 'https://grand-mackerel-urgently.ngrok-free.app'
    useEffect(() => {
        const fetchInitialMessage = async () => {
            try {
                const response = await axios.get(`${PUBLIC_URL}/`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420"
                    }
                });

                const newMessage = { 
                    id: String(messages.length + 1), 
                    name: 'Server', 
                    text: response.data.reply 
                };
                
                // Update the messages with the new message
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            } catch (error) {
                console.error('Error fetching initial message:', error);
            }
        };

        fetchInitialMessage();
    }, []);

    // Callback function to send message and get response
    const sendMessage = (message) => {
        // Here, you can make an API call to your server to send the message and get a response
        // For now, we'll simulate a server response
        const newMessage = { id: String(messages.length + 1), name: 'Server', text: `Response to: ${message}` };

        // Update the messages with the new message
        setMessages((prevMessages) => [...prevMessages, { id: String(messages.length + 1), name: 'Roshith', text: message }, newMessage]);
    };
    console.log(messages)
    return (
        <div className="flex w-full h-screen bg-cover bg-center px-6" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1641895964758-3e4374714a8c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RhcnJ5JTIwbmlnaHQlMjBza3l8ZW58MHx8MHx8fDA%3D')" }}>
            {/* Navbar */}
            <div className='hidden md:flex w-1/3 h-screen items-center'>
                <Navbar className="flex-none" />
            </div>

            <div className='flex flex-col w-full h-5/6 justify-center my-auto rounded-lg ml-6 mx-2'>
                {/* Chat Field */}
                <div className="flex-grow overflow-auto">
                    <ChatField message={messages} />
                </div>

                {/* Input Field */}
                <div className="flex-none">
                    <InputField sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
