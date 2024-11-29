import React, { useState } from 'react';

const NavBar = (props) => {
    const [loading, setLoading] = useState(false); // Loading state to manage the button during request
    const [extractedData, setExtractedData] = useState(null); // State to store the extracted data

    const handleButtonClick = async () => {
        setLoading(true); // Set loading state to true when the request is initiated

        try {
            // Call the GET /extract_data/ endpoint
            const response = await fetch('https://grand-mackerel-urgently.ngrok-free.app/extract_data', {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': '69420', // Custom header
                    'Content-Type': 'application/json', // Optional: Content-Type if needed
                },
            });
            
            // If the response is successful
            if (response.ok) {
                const data = await response.json();
                console.log(data); // You can log the data to the console or handle it here
                setExtractedData(data.data); // Set the extracted data in the state
            } else {
                // Handle any errors if the response isn't OK
                console.error('Error fetching extracted data');
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error occurred while fetching data:', error);
        } finally {
            setLoading(false); // Set loading state to false after the request is completed
        }
    };

    return (
        <div className='bg-primary items-center flex w-full h-5/6 justify-center py-3 p-2 rounded-lg mx-2'>
            <div className='w-6/6'>
                <div className='px-2 text-third'>
                    <h3 className='font-heading font-medium text-xl'>Better Mind</h3>
                    <button 
                        onClick={handleButtonClick} 
                        disabled={loading} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        {loading ? 'Loading...' : 'Get PDF'}
                    </button>
                    {/* Display extracted data after fetching */}
                    {extractedData && (
                        <div className="mt-4">
                            <h4 className="font-medium text-lg">Extracted Data</h4>
                            <ul>
                                <li><strong>Date:</strong> {extractedData[0]?.join(', ')}</li>
                                <li><strong>Place:</strong> {extractedData[1]?.join(', ')}</li>
                                <li><strong>Name:</strong> {extractedData[2]?.join(', ')}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
