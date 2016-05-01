/*
  Maps.js

  Displays maps using OpenStreetMap, Leaflet, Google, OpenLayers, MapQuest.
*/

(function() {
'use strict';

//=============================================================================


var locations = [
    { name: 'Space Needle', lat: 47.6205, lon: -122.3493, zoom: 16 },
    { name: 'Bellevue Botanical Garden', lat: 47.6063, lon: -122.1707, zoom: 16 },
    { name: 'İstanbul', lat: 40.9869, lon: 29.0121, zoom: 11 },
    { name: 'Yosemite', lat: 37.7310, lon: -119.5733, zoom: 13 },
    { name: 'Monmouth', lat: 44.8490, lon: -123.2276, zoom: 14 }
];

var leafletOsmMap;
var leafletAerialMap;
var googleMap;
var openLayersMap;
var defaultZoom = 15;

//=============================================================================

makeSlippyMaps( );
initLocation( );
setupLocationMenu( );

$('#location-menu').on( 'change', setLocationFromMenu );
$('#submit-coords').on( 'click', setLocationFromCoords );
$('#use-device-loc').on( 'click', setLocationFromDevice );

//=============================================================================

function makeSlippyMaps( ) {
    leafletOsmMap = L.map( 'slippy-leaflet-osm' );
    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                 {
                     attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                     maxzoom: 19
                 } ).addTo( leafletOsmMap );

    leafletAerialMap = L.map( 'slippy-leaflet-aerial' );
    L.tileLayer( 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png',
                 {
                     type: 'sat',
                     attribution: 'Imagery &copy; NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency, ' + 'Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" />',
                     subdomains: '1234'
                 } ).addTo( leafletAerialMap );

    googleMap = new google.maps.Map(
        $('#slippy-google')[0],
        {
            mapTypeId: google.maps.MapTypeId.HYBRID
        } );

    openLayersMap = new ol.Map(
        {
            target: 'slippy-openlayers',
            layers: [
                new ol.layer.Tile( {
                    source: new ol.source.MapQuest( { layer: 'osm' } )
                } )
            ]
        } );
}

//=============================================================================

function initLocation( ) {
    var loc = locations[ 0 ];
    setMapsLocation( loc.lat, loc.lon, loc.zoom );
}

//=============================================================================

function setMapsLocation( latitude, longitude, zoom ) {
    var staticOsmUrl = 'http://staticmap.openstreetmap.de/staticmap.php' +
        '?size=600x400' +
        '&center=' + latitude + ',' + longitude +
        '&zoom=' + zoom +
        '&maptype=mapnik';
    var staticGoogleUrl = 'https://maps.googleapis.com/maps/api/staticmap' +
        '?size=600x400' +
        '&center=' + latitude + ',' + longitude +
        '&zoom=' + zoom;

    $('#static-osm').attr( 'src', staticOsmUrl );
    $('#static-google').attr( 'src', staticGoogleUrl );

    leafletOsmMap.setView( [ latitude, longitude ], zoom );
    leafletAerialMap.setView( [ latitude, longitude ], zoom );

    googleMap.setCenter( { lat: latitude, lng: longitude } );
    googleMap.setZoom( zoom );

    openLayersMap.setView( new ol.View( {
        center: ol.proj.fromLonLat( [ longitude, latitude ] ),
        zoom: zoom
    } ) );
}

//=============================================================================

function setupLocationMenu( ) {
    var select = $('#location-menu');
    var i, len;
    var opt;

    for ( i = 0, len = locations.length; i < len; ++i ) {
        opt = $( '<option>' );
        opt.attr( 'value', i );
        opt.text( locations[ i ].name );
        select.append( opt );
    }
}

//-----------------------------------------------------------------------------

function setLocationFromMenu( ) {
    var idx = $('#location-menu').val();
    var loc = locations[ idx ];
    setMapsLocation( loc.lat, loc.lon, loc.zoom );
}

//=============================================================================

function setLocationFromCoords( evt ) {
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var zoom = $('#zoom').val();

    lat = clamp( +lat, -90, 90 );
    lon = clamp( +lon, -180, 180 );
    zoom = clamp( +zoom, 1, 20 );

    setMapsLocation( lat, lon, zoom );

    evt.preventDefault( );

    //-------------------------------------------------------------------------

    function clamp( val, min, max ) {
        return Math.min( Math.max( min, val ), max );
    }
}

//=============================================================================

function setLocationFromDevice( ) {
    if ( navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(
            handleCurrentPosition,
            reportGeolocationError,
            {
                enableHighAccuracy: false,
                maximumAge: 600000, //10 min
                timeout: 30000      //30 sec
            } );
    }

    //-------------------------------------------------------------------------

    function handleCurrentPosition( position ) {
        setMapsLocation( position.coords.latitude,
                         position.coords.longitude,
                         defaultZoom );
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


//=============================================================================
})();
