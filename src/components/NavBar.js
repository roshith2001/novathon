import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Menu, MenuItem } from '@mui/material';


const NavBar = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignIn = () => {
        props.signIn();
        setAnchorEl(null);
    }
    const handleSignOut = () => {
        props.signOut();
        setAnchorEl(null);
    }
    

    return(
        <div className='bg-primary items-center flex w-full sticky top-0 justify-between py-3 p-2 shadow-lg'>
            <div className='w-5/6'>
                <div className='px-2 text-third'>
                    <h3 className='font-heading font-medium text-xl'>Roshith's Chat Room</h3>
                </div>
            </div>
            <div className=''>
               <Button
                aria-controls='login-menu'
                aria-haspopup='true'
                onClick={handleClick}
                endIcon={<MoreVertIcon style={{ width: 25, height: 25, color: '#02182B'}} />}
               >
                
               </Button>
               <Menu
                id='login-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
               >
                {props.userState?
                <MenuItem onClick={handleSignIn}>Sign Out</MenuItem>
                :
                <MenuItem onClick={handleSignOut}>Sign In</MenuItem>

                }
               </Menu>
            </div>
        </div>
    );
}

export default NavBar;