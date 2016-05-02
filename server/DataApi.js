/*
  DataApi.js
  David M. Anderson

  Express middleware for data API for CRUD operations on Mongo database
*/

module.exports = function( express ) {

    var router = express.Router();
    var mongodb = require( 'mongodb' );

    var database;

    //=========================================================================

    connectToDb( );

    router.get( '/:collctn', listItems );
    router.get( '/:collctn/:id', getItem );
    router.post( '/:collctn', addItem );
    router.put( '/:collctn/:id', updateItem );
    router.delete( '/:collctn/:id', deleteItem );

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
            collection.find( ).toArray( function( err, docs ) {
                if ( err ) {
                    response.send( { error: err } );
                } else {
                    response.send( docs );
                }
            } );
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
        if ( collName === 'danderson' ) {
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
