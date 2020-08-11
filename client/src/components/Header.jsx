import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Header = props => {
    return (
        <header>
            <h1><BookmarkIcon />Keeper</h1>
            {props.loggedIn &&
                <div className='logoutGroup'>
                    <p>Hi, {props.username}</p>
                    <button className='logoutButton' onClick={props.handleLogout}>Log out </button>
                </div>
            }
        </header>
    );
};

export default Header;