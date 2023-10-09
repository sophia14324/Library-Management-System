const express = require('express');
const hbs = require('express-handlebars');
const pool = require('./db');
const app = express();

const PORT = process.env.PORT || 5000;

// setup handlebars template engine
app.engine('hbs', hbs.engine({

    extname: 'hbs',
    defaultlayout: 'main',
    layoutsDir: './views/layouts/',
    partialsDir:'./views/includes/'

}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('helloworld');
});
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {

    res.status(err.status).send(
        `
        <h1>${err.status}</h1>
        <h2>Error${err.messae}</h2> 
        <p>Stack:${err.stack}</p>

        `
    );
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
