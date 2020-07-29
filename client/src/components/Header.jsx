import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Header = () => {
    return (
        <header>
            <h1><BookmarkIcon/>Keeper</h1>
            <button>log out</button>
        </header>
    );
};

export default Header;