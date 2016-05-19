/*
  LocalStorageSettings.js
*/


(function() {
'use strict';
//=============================================================================


var SETTINGS_KEY = 'LSS_Settings';
var settings = getSettings( );
if ( settings.name ) {
    showHelloPage( );
} else {
    showFormPage( );
}

$('#edit-settings').on( 'click', showFormPage );
$('#clear-settings').on( 'click', clearSettings );

//=============================================================================

function getSettings( ) {
    var settingsString = localStorage[ SETTINGS_KEY ];
    if ( settingsString ) {
        return JSON.parse( settingsString );
    } else {
        return { };
    }
}

//-----------------------------------------------------------------------------

function saveSettings( ) {
    localStorage[ SETTINGS_KEY ] = JSON.stringify( settings );
}

//=============================================================================

function showHelloPage( ) {
    $('.show-name').text( settings.name );

    $('#hello-page').show( );
    $('#form-page').hide( );
}

//=============================================================================

function showFormPage( ) {
    $('#name').val( settings.name );
    $('#submit').one( 'click', updateSettings );

    $('#hello-page').hide( );
    $('#form-page').show( );

    //-------------------------------------------------------------------------

    function updateSettings( evt ) {
        evt.preventDefault( );
        settings.name = $('#name').val();
        saveSettings( );
        showHelloPage( );
    }
}

//=============================================================================

function clearSettings( ) {
    localStorage.removeItem( SETTINGS_KEY );
}

//=============================================================================
})();
