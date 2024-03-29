var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var apiRoutes = require('./app/routing/apiRoutes.js');
var htmlRoutes = require('./app/routing/htmlRoutes.js');


var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Server Routing Map 
apiRoutes(app); 
htmlRoutes(app); 

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});