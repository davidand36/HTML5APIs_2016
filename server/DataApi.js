/*
  DataApi.js
  David M. Anderson

  Express middleware for data API for CRUD operations on Mongo database
*/

module.exports = function( express ) {

    var router = express.Router();
    var cors = require( 'cors' );
    var mongodb = require( 'mongodb' );

    var database;

    //=========================================================================

    connectToDb( );

    router.get( '/:collctn', cors(), listItems );
    router.get( '/:collctn/:id', cors(), getItem );
    router.post( '/:collctn', cors(), addItem );
    router.put( '/:collctn/:id', cors(), updateItem );
    router.delete( '/:collctn/:id', cors(), deleteItem );
    router.options( '/:collctn/:id', cors() );

    //=========================================================================

    function connectToDb( ) {
        var uri = process.env.MONGODB_URI;
        if ( ! uri ) {
            console.error( 'MONGODB_URI .env var not set' );
            return;
        }
        mongodb.MongoClient.connect( uri, function( err, db ) {
            if ( err ) {
                console.error( 'Error connecting to MongoDB: ', err );
            } else {
                console.log( 'Connected to ' + uri );
                database = db;
            }
        } );
    }

    //=========================================================================

    function listItems( request, response ) {
        try {
            var collection = getCollection( request.params.collctn );
            var query = {};
            var cursor = collection.find( query );
            if ( request.query.count ) {
                cursor.count( function( err, count ) {
                    if ( err ) {
                        response.send( { error: err } );
                    } else {
                        response.send( { count: count } );
                    }
                } );
            }
            else {
                if ( request.query.skip ) {
                    cursor = cursor.skip( +request.query.skip )
                }
                if ( request.query.limit ) {
                    cursor = cursor.limit( +request.query.limit );
                }
                cursor.toArray( function( err, docs ) {
                    if ( err ) {
                        response.send( { error: err } );
                    } else {
                        response.send( docs );
                    }
                } );
            }
        } catch ( excptn ) {
            response.send( { error: excptn } );;
        }
    }

    //-------------------------------------------------------------------------

    function getItem( request, response ) {
        try {
            var collection = getCollection( request.params.collctn );
            var id = makeId( request.params.id );
            collection.findOne( { _id: id }, function( err, doc ) {
                if ( err ) {
                    response.send( { error: err } );
                } else {
                    if ( doc ) {
                        response.send( doc );
                    } else {
                        response.send( { error: 'No matching item' } );
                    }
                }
            } );
        } catch ( excptn ) {
            response.send( { error: excptn } );;
        }
    }

    //-------------------------------------------------------------------------

    function addItem( request, response ) {
        try {
            var collection = getCollection( request.params.collctn );
            var item = request.body;
            collection.insertOne( item, function( err, result ) {
                if ( err ) {
                    response.send( { error: err } );
                } else {
                    response.send( { created: result.insertedId } );
                }
            } );
        } catch ( excptn ) {
            response.send( { error: excptn } );;
        }
    }

    //-------------------------------------------------------------------------

    function updateItem( request, response ) {
        try {
            var collection = getCollection( request.params.collctn );
            var id = makeId( request.params.id );
            var item = request.body;
            collection.updateOne( { _id: id }, { $set: item }, function( err, result ) {
                if ( err ) {
                    response.send( { error: err } );
                } else {
                    response.send( { updated: id } );
                }
            } );
        } catch ( excptn ) {
            response.send( { error: excptn } );;
        }
    }

    //-------------------------------------------------------------------------

    function deleteItem( request, response ) {
        try {
            var collection = getCollection( request.params.collctn );
            var id = makeId( request.params.id );
            collection.deleteOne( { _id: id }, function( err, result ) {
                if ( err ) {
                    response.send( { error: err } );
                } else {
                    response.send( { deleted: id } );
                }
            } );
        } catch ( excptn ) {
            response.send( { error: excptn } );;
        }
    }

    //=========================================================================

    function getCollection( collName ) {
        var accounts = process.env.DATA_API_ACCOUNTS;
        if ( accounts.indexOf( collName ) >= 0 ) {
            return database.collection( collName );
        } else {
            throw 'Invalid collection: ' + collName;
        }
    }

    //-------------------------------------------------------------------------

    function makeId( idStr ) {
        try {
            return new mongodb.ObjectID( idStr );
        } catch ( excptn ) {
            throw 'Bad ID: ' + idStr;
        }
    }

    //=========================================================================

    return router;
};
