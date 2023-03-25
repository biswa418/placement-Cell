const express = require('express');
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
//mongo
const db = require('./config/mongoose');    //mongoose
const session = require('express-session'); //session cookie
const logger = require('morgan'); //logger - prod

const passport = require('passport');       //auth
const env = require('./config/environment'); //env var
const flash = require('connect-flash'); //flash message
const MongoStore = require('connect-mongo');    //db connect
const passportLocal = require('./config/passport-local-strategy');  //local strat for passport
const customMware = require('./config/Notymiddleware'); //use noty

//helper to read files from manifest
require('./config/helpers')(app);

if (env.name == 'development') {

    const srcDir = path.join(__dirname, 'assets', 'scss');
    const destDir = path.join(__dirname, 'assets', 'css');

    //convert scss to css
    fs.readdir(srcDir, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach(file => {
            if (!file.endsWith('.scss')) {
                return;
            }

            const filePath = path.join(srcDir, file);
            const outputFile = file.replace(/\.scss$/, '.css');
            const outputFilePath = path.join(destDir, outputFile);

            sass.render({
                file: filePath,
                outputStyle: 'compressed'
            }, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }

                fs.writeFile(outputFilePath, result.css.toString(), err => {
                    if (err) {
                        console.error(err);
                    } else {
                    }
                });
            });
        });
        console.log(`SCSS compiled to CSS`);
    });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(env.asset_path));

//use cookie parser 
app.use(cookieParser());


//prod logs
app.use(logger(env.morgan.mode, env.morgan.options));

//use the layouts
app.use(expressLayouts);
//inividual add styles
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

//session --> save on mongoStore
app.use(session({
    name: 'placement', //name of the cookie
    //change secret in prod
    secret: env.session_cookie_key, //key to encode and decode
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 200 * 60), //expiry of cookie in ms
        SameSite: 'None', //browser warns to deprecate it as a third party cookie
    },
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://admin:${env.db}@placement.jdhzqhg.mongodb.net/?retryWrites=true&w=majority`,
        autoRemove: 'disabled'
    },

        function (err) {
            console.log(err || 'connect-mongo set up working');
        }
    )
}));

//use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//connect-flash use
app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));

app.listen(port, function (err) {
    console.log(err || `Server is started on port: ${port}`);
});



