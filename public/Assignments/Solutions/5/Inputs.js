/*
  Inputs.js
*/

(function() {
'use strict';

//=============================================================================

displayAllInputValues( );

$('input, textarea, select').on( 'change', displayNewValue );

//=============================================================================

function displayAllInputValues( ) {
    $('input, textarea, select').each( function( ) {
        displayValue( $( this ) );
    } );
}

//-----------------------------------------------------------------------------

function displayNewValue( evt ) {
    var input = $(evt.target);
    displayValue( input );
}

//-----------------------------------------------------------------------------

function displayValue( input ) {
    var type = input.attr( 'type' );
    var name = input.attr( 'name' );
    var value;

    if ( type === 'checkbox' ) {
        value = input.prop( 'checked' );
    } else {
        value = input.val( );
    }

    $( '#' + name + '-value' ).text( value );
}


//=============================================================================
})();
