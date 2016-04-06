/*
  Maps.js

*/

(function() {
'use strict';

//=============================================================================

var apis = [
    { name: 'OpenLayers', api: 'openlayers' },
    { name: 'Google', api: 'googlev3' },
    { name: 'Bing', api: 'microsoft7' },
    { name: 'Leaflet', api: 'leaflet' }
];

var locations = [
    { name: 'Space Needle', lat: 47.6205, lon: -122.3493, zoom: 17 },
    { name: 'Bellevue Botanical Garden', lat: 47.6063, lon: -122.1707, zoom: 16 },
    { name: 'İstanbul', lat: 40.9869, lon: 29.0121, zoom: 11 },
    { name: 'Yosemite', lat: 37.7310, lon: -119.5733, zoom: 13 },
    { name: 'Monmouth', lat: 44.8490, lon: -123.2276, zoom: 14 }
];

var maps = [];
var latitude = locations[ 0 ].lat;
var longitude = locations[ 0 ].lon;
var zoom = locations[ 0 ].zoom;

var currentLat, currentLon;
var defaultZoom = 15;

//=============================================================================

makeTheMaps( );
setupLocationMenu( );
setupCurrentLocation( );

//=============================================================================

function makeTheMaps( ) {
    var i, numApis, api;
    var latLon = new mxn.LatLonPoint( latitude, longitude );
    var mapsDiv, heading, mapHolder, mapDivId, mapDiv;

    mapsDiv = $('#maps');
    for ( i = 0, numApis = apis.length; i < numApis; ++i ) {
        api = apis[ i ];

        heading = $('<h2>' + api.name + '</h2>' );
        mapsDiv.append( heading );
        mapHolder = $('<div class="mapHolder"></div>');
        mapDivId = 'mapDiv' + i;
        mapDiv = $('<div id="' + mapDivId + '" class="map"></div>' );
        mapHolder.append( mapDiv );
        mapsDiv.append( mapHolder );
        
        maps[ i ] = new mxn.Mapstraction( mapDivId, api.api, true );
        maps[ i ].setCenterAndZoom( latLon, zoom );
        maps[ i ].enableScrollWheelZoom( );
        maps[ i ].addControls( {
            pan: true,
            zoom: 'large',
            scale: true,
            map_type: true
        } )
    }
}

//=============================================================================

function setupLocationMenu( ) {
    var select = $('#locationMenu' );
    var i, len;
    var opt;

    for ( i = 0, len = locations.length; i < len; ++i ) {
        opt = $( '<option value="' + i + '">' + locations[ i ].name +
                 '</option>' );
        select.append( opt );
    }
    select.val( 0 );

    select.on( 'change',
               function( ) {
                   var idx = Number( select.val() );
                   var latLon;
                   var i, numMaps;
                   if ( idx < 0 ) { //current location
                       latitude = currentLat;
                       longitude = currentLon;
                       zoom = defaultZoom;
                   } else {
                       latitude = locations[ idx ].lat;
                       longitude = locations[ idx ].lon;
                       zoom = locations[ idx ].zoom;
                   }
                   latLon = new mxn.LatLonPoint( latitude, longitude );
                   for ( i = 0, numMaps = maps.length; i < numMaps; ++i ) {
                       maps[ i ].setCenterAndZoom( latLon, zoom );
                   }
               }
             );
}

//-----------------------------------------------------------------------------

function setupCurrentLocation( ) {
    if ( navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(
            handleCurrentLocation,
            reportGeolocationError,
            {
                enableHighAccuracy: true,
                maximumAge: 600000, //10 min
                timeout: 60000 //1 min
            }
        );
    }

    //-------------------------------------------------------------------------

    function handleCurrentLocation( position ) {
        var select = $('#locationMenu' );
        var opt;

        currentLat = position.coords.latitude;
        currentLon = position.coords.longitude;

        opt = $( '<option value="-1">Current location</option>' );
        select.prepend( opt );
    }

    //-------------------------------------------------------------------------

    function reportGeolocationError( error ) {
        var message;
        switch ( error.code )
        {
        case error.PERMISSION_DENIED:
            message = "Geolocation permission denied.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Geolocation position unavailable.";
            break;
        case error.TIMEOUT:
            message = "Geolocation timed out.";
            break;
        }
        message += '\n' + error.message;
        console.log( message );
    }
}

//-----------------------------------------------------------------------------
})();
