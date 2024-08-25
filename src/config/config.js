// src/config/config.js

const ENV = process.env.REACT_APP_ENV || 'development';

const DEVELOPMENT = {
    API_BASE_URL: 'http://localhost:5000',
    DEBUG_MODE: true,
    FEATURE_TOGGLE: {
        ENABLE_NOTES: true,
        ENABLE_ARCHIVING: false,
    },
};

const PRODUCTION = {
    API_BASE_URL: 'https://inotebook-backend-jufm.onrender.com',
    DEBUG_MODE: false,
    FEATURE_TOGGLE: {
        ENABLE_NOTES: true,
        ENABLE_ARCHIVING: true,
    },
};

const CONFIG = {
    development: DEVELOPMENT,
    production: PRODUCTION,
};

export default CONFIG[ENV];
