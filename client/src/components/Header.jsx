import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Header = () => {
    return (
        <header>
            <h1><BookmarkIcon />Keeper</h1>
            <button>
                <a href="http://localhost:8080/logout">log out</a>
            </button>
        </header>
    );
};

export default Header;