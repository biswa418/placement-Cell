const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access-log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: 'assets',
    session_cookie_key: 'something',
    db: 'placement_development',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}

const production = {
    name: 'production',
    asset_path: 'public/assets',
    session_cookie_key: process.env.PLACEMENT_SESSION_COOKIE_KEY,
    db: process.env.PLACEMENT_DB,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : production;