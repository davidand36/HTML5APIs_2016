/*
  NoArrayStats.js

  Computes and displays statistics about numbers entered into form
  NOTES:
  1. This version does not store the numbers entered, only some running totals.
  2. Consequently, it uses little memory, but can't compute the median.
  3. The algorithm used here to compute the standard deviation is "naïve",
     which is to say that it is simple but can result in poor precision.
     See https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
     for a discussion and some better algorithms.
*/


(function() {
'use strict';
//=============================================================================

var count = 0;
var sum = 0;
var sumSqr = 0;
var average;
var stdDev;

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
    ++count;
    sum += number;
    sumSqr += number * number;
    ComputeStats( );
    DisplayStats( );
}

//=============================================================================

function ComputeStats( ) {
    var variance;
    if ( count > 0 ) {
        average = sum / count;
    } else {
        average = undefined;
    }
    if ( count > 1 ) {
        variance = (sumSqr  -  sum * sum / count) / (count - 1);
        stdDev = Math.sqrt( variance );
    } else {
        stdDev = undefined;
    }
}

//=============================================================================

function DisplayStats( ) {
    displayValue( '#count', count );
    displayValue( '#sum', sum );
    displayValue( '#average', average );
    displayValue( '#std-dev', stdDev );

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
    sumSqr = 0;
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
