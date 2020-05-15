/*
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
*/
const express = require('express');
const app = express();
const routes = require('require-dir')('./routes');
const pug = require('pug');
const path = require('path');
/*const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const users = [];

const initializePassport = require('./passport-config')
initializePassport(passport, email => {
    return users.find(user => user.email === email)
})

app.use(flash())
app.use(session({
    secret: process.env.SESSOIN_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
*/
//app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('port', 3000);

for(var p in routes) app.use('/', routes[p]);

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});