const path = require('path');

const APP_DIR = path.resolve(__dirname, '..', 'app');
const UID_DIR = path.resolve(APP_DIR, 'uid');
const TORRENT_CACHE_DIR = path.resolve(APP_DIR, 'torrent');

module.exports = { APP_DIR, UID_DIR, TORRENT_CACHE_DIR }
