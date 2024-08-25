// src/config/constants.js

export const API_BASE_URL = 'https://api.example.com/v1';

export const ACTION_TYPES = {
    FETCH_NOTES: 'FETCH_NOTES',
    CREATE_NOTE: 'CREATE_NOTE',
    UPDATE_NOTE: 'UPDATE_NOTE',
    DELETE_NOTE: 'DELETE_NOTE',
    ARCHIVE_NOTE: 'ARCHIVE_NOTE',
};

export const STATUS_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

export const USER_ROLES = {
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR',
    VIEWER: 'VIEWER',
};

export const EMPTY_NOTE_MESSAGE = 'No notes available.';
export const ARCHIVE_NOTE_MESSAGE = 'Archive this note?';
export const LOADING_MESSAGE = 'Loading...';

export const DEFAULT_LANGUAGE = 'en';
