
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//setting
app.set('port', 4001);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//midlewares
app.use(morgan('dev'));
 // es pra poder utilizar los datos que viene de json o los datos para json.
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'))

//static
app.use(express.static(path.join(__dirname,'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not found');
})

module.exports = app;