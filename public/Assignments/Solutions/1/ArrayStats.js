/*
  ArrayStats.js

  Computes and displays statistics about numbers entered into form
  NOTES:
  1. This version stores the numbers in an array.
  2. Consequently, it is capable of computing the median, but could require
     more memory if a lot of numbers are entered. (If numbers are entered at
     human speeds, this won't be a problem.)
  3. The technique here is somewhat inefficient for a couple of reasons:
     a) Each time a number is entered, the sum is recalculated, which isn't
        really necessary.
     b) Each time a number is entered, the array is re-sorted. It would be
        faster to keep it sorted and insert the new number where it belongs.
     Nevertheless, for the number of entries a human would submit,
     this will be plenty fast.
*/


(function() {
'use strict';
//=============================================================================

var numbers = [];
var count = 0;
var sum = 0;
var average;
var stdDev;
var median;

DisplayStats( );

$('#submit').on( 'click', processForm );
$('#reset').on( 'click', reset );
$('#the-number').on( 'focus', clearMessage );

//=============================================================================

function processForm( evt ) {
    var val = $('#the-number').val();
    var num = parseFloat( val );
    if ( isNaN( num ) ) {
        showMessage( 'Sorry, that is not a number I understand.' );
    } else {
        processNumber( num );
    }
    evt.preventDefault( );
}

//=============================================================================

function processNumber( number ) {
    numbers.push( number );
    ComputeStats( );
    DisplayStats( );
}

//=============================================================================

function ComputeStats( ) {
    var i;
    var sum2 = 0;
    var diff;
    var variance;

    count = numbers.length;

    sum = 0;
    for ( i = 0; i < count; ++i ) {
        sum += numbers[ i ];
    }

    if ( count > 0 ) {
        average = sum / count;
    } else {
        average = undefined;
    }

    if ( count > 1 ) {
        for ( i = 0; i < count; ++i ) {
            diff = numbers[ i ] - average;
            sum2 += diff * diff;
        }
        variance = sum2 / (count - 1 );
        stdDev = Math.sqrt( variance );
    } else {
        stdDev = undefined;
    }

    if ( count > 0 ) {
        numbers.sort( function compareNumbers( a, b ) {
            return a - b;
        } );
        if ( count % 2 === 0 ) {
            median = (numbers[ count / 2 - 1 ] + numbers[ count / 2 ]) / 2;
        } else {
            median = numbers[ Math.floor( count / 2 ) ];
        }
    } else {
        median = undefined;
    }
}

//=============================================================================

function DisplayStats( ) {
    displayValue( '#count', count );
    displayValue( '#sum', sum );
    displayValue( '#average', average );
    displayValue( '#std-dev', stdDev );
    displayValue( '#median', median );

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
    numbers = [];
    ComputeStats( );
    DisplayStats( );
}

//=============================================================================

function showMessage( msg ) {
    $('#message' ).text( msg );
}

//-----------------------------------------------------------------------------

function clearMessage( ) {
    $('#message' ).text( '' );
}

//=============================================================================
})();
