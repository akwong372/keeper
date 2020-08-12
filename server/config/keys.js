require('dotenv').config();

const GOOGLE_KEYS = {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET
};

const DB_URL = {
    DB_URL: process.env.DB_URL
};

const KEYS = {
    ...GOOGLE_KEYS,
    ...DB_URL
};

module.exports = KEYS;