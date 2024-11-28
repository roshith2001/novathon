import React, { useState } from 'react';

const NavBar = (props) => {

    return(
        <div className='bg-primary items-center flex w-full h-24 sticky top-0 justify-center py-3 p-2'>
            <div className='w-6/6'>
                <div className='px-2 text-third'>
                    <h3 className='font-heading font-medium text-xl'>Relief Buddy</h3>
                </div>
            </div>
        </div>
    );
}

export default NavBar;