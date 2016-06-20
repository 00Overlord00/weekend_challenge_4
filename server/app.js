var express = require( 'express' );
var app = express();
var path = ( 'path' );  //Shit you need.
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var connectionString = 'postgres://localhost:5432/task_manager';  //Determines how we connect to the db.

app.listen( 8080, 'localhost', function( req, res) {  //Tells our server the port on which to listen.
  console.log( 'Server is listening on 8080.' );
});

app.use( express.static( 'public' ) );  //Sets our public folder to static.

app.get( '/', function( req, res) {
  res.sendFile( 'views/index.html' ); //Base url sends back our index.html file.
});

app.post( '/postRoute', urlencodedParser, function( req, res ){  //Post call.
  pg.connect( connectionString, function( err, client, done ){
    var query = client.query( 'INSERT INTO tasks ( to_do, completed ) VALUES ( $1, $2 )', [ req.body.task, req.body.completed] );  //Add SQL syntax here.
    res.end();
  });
});

app.get( '/getPath', function( req, res ){  //Get call.
  var results = [];
  pg.connect( connectionString, function( err, client, done){
    var query = client.query( 'SELECT  * FROM tasks;' );  //SQL syntax here, as well.
    var rows = 0;
    query.on( 'row', function( row ){
      results.push(row);
    });
    query.on( 'end', function() {
      return res.json( results );
    });
  });
});
