const express = require('express');
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');



app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

//use the layouts
app.use(expressLayouts);
//inividual add styles
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');



app.get('/', require('./routes'));

app.listen(port, function (err) {
    console.log(err || `Server is started on port: ${port}`);
});



