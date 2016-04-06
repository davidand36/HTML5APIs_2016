/* Web site for UW HTML5 APIs course */

var express = require( 'express' );
var favicon = require( 'serve-favicon' );
var logfmt = require( 'logfmt' );
var compression = require( 'compression' );
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var app = express();

//=============================================================================

app.use( favicon( __dirname + '/public/favicon.ico' ) );
app.use( logfmt.requestLogger() );
app.use( compression() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( __dirname + '/public/' ) );

var port = Number( process.env.PORT || 6223 );
var server = app.listen( port,
                         function( )
                         {
                             console.log( "Listening on port " + port );
                         } );
