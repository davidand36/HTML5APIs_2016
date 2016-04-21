/*
  NumbersAndStrings.js

  Reads user input. If numeric, computes and displays basic statistics.
  Otherwise concatenates strings.
*/

(function() {
'use strict';
//=============================================================================

var count = 0;
var sum = 0;
var average;
var concatenatedString = '';

DisplayResults( );

$('#submit').on( 'click', processForm );
$('#reset').on( 'click', reset );

//=============================================================================

function processForm( evt ) {
    var val = $('#user-input').val();
    var num = +val;
    if ( isNaN( num ) ) {
        processString( val );
    } else {
        processNumber( num );
    }
    evt.preventDefault( );
}

//=============================================================================

function processString( string ) {
    concatenatedString += string;
    DisplayResults( );
}

//=============================================================================

function processNumber( number ) {
    ++count;
    sum += number;
    if ( count > 0 ) {
        average = sum / count;
    } else {
        average = undefined;
    }
    DisplayResults( );
}

//=============================================================================

function DisplayResults( ) {
    displayValue( '#count', count );
    displayValue( '#sum', sum );
    displayValue( '#average', average );
    displayValue( '#concatenation', concatenatedString );

    //-------------------------------------------------------------------------

    function displayValue( selector, value ) {
        if ( value === undefined ) {
            $( selector ).empty( );
        } else {
            $( selector ).text( value );
        }
    }
}

//=============================================================================

function reset( ) {
    count = 0;
    sum = 0;
    average = undefined;
    concatenatedString = '';
    DisplayResults( );
}

//=============================================================================
})();
