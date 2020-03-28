const express = require('express');
const app = express();
//const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const routes = require('require-dir')('./routes');

const pug = require('pug');


//app.engine('handlebars', handlebars.engine);
app.use(express.static('public'));

//app.set('view engine', 'handlebars');
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