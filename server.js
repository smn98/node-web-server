const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to save log details.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance'
    });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Hello World!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});