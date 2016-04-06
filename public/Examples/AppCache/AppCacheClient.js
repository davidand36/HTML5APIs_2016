/*
  AppCacheClient.js
  David M. Anderson

  Client-side script for AppCache demo
*/

(function() {
'use strict';

//=============================================================================


var clientTime = new Date();
var text = 'The time on this computer is ' + clientTime.toString() + '<br />' +
        serverTimeString;
$('main').html( text );


//=============================================================================


var cache = window.applicationCache;
var cacheEvents = [ 'cached', 'checking', 'downloading', 'error',
                    'noupdate', 'obsolete', 'progress', 'updateready' ];
var cacheStatuses = [ 'uncached', 'idle', 'checking', 'downloading',
                      'updateready', 'obsolete' ];
var i, len;

if ( cache ) {
    for ( i = 0, len = cacheEvents.length; i < len; ++i ) {
        cache.addEventListener( cacheEvents[ i ], logCacheEvent, false );
    }

    //cache.update( );
    /*
    cache.addEventListener(
        'updateready',
        function( ) {
            window.applicationCache.swapCache( );
            window.location.reload( );
        },
        false );
    */
}

function logCacheEvent( event ) {
    var msg = 'Online: ' + (navigator.onLine ? 'yes' : 'no') +
        '  Cache status: ' + cacheStatuses[ cache.status ] +
        '  Event type: ' + event.type;
    console.log( msg );
}


//=============================================================================
})();
