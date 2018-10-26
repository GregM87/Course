const express = require('express');
const port = process.env.PORT || 3000;
const fs= require ('fs');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>  {
    return new Date().getFullYear()
})
hbs.registerHelper('ScreamIt', (text) =>  {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');



app.use((req, res, next) => {

    res.render('maintenance.hbs');
})

// Middleware to add to express and tweak the functionality
app.use(express.static(__dirname + '/public'));
// Middleware to alter & access req and respond attributes
// e.g. Application performance, user authentication, print 
//next tells express when middlewarefunction is done
app.use((req, res, next)=>{

    var now = new Date().toString();    
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {

        if (err){

            console.log ('unable to append to server.log');
        }
    });
    next();

})


//---------__ROUTING_---------------

// request stores header, body, path etc.
// response has many methods
app.get('/', (req, res) => {

    res.render('home.hbs', {

        pageTitle: 'Home Page',
        welcomeMessage: 'Willkommen zur Sinnlos Page',

    });

});

app.get('/about', (req, res) => {

    res.render('about.hbs', {

        pageTitle: 'AboutPage',

    });

});


app.get('/bad', (req, res) => {

    res.send({

        error: '404'
    });

});


//binding server to browser by listening
app.listen(port, () => {

    console.log(`server is up on port ${port}`);
});