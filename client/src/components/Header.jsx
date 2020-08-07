import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Header = props => {
    return (
        <header>
            <h1><BookmarkIcon />Keeper</h1>
            <button onClick={props.handleLogout}>log out </button>
        </header>
    );
};

export default Header;