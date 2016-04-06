/*
  PrimeWorker.js

  Web Worker script that computes prime numbers
*/

//*****************************************************************************


// Messages from the main thread:
onmessage = function( event ) {
    if ( event.data === 'start' ) {
        start( );
    }
    else if ( event.data === 'stop' ) {
        stop( );
    }
}

//=============================================================================

var intervalId;

//-----------------------------------------------------------------------------

function start( ) {
    // We need to set a "governor" on the rate at which we send messages back
    //  to the main thread or UI will get bogged down. One millisecond seems
    //  to be plenty. (The problem is that, at least for small values of n,
    //  the computations are a bit too easy.)
    intervalId = setInterval( testNextNumber, 1 );
}

//-----------------------------------------------------------------------------

function stop( ) {
    clearInterval( intervalId );
}

//=============================================================================

var n = 2;

//-----------------------------------------------------------------------------

function testNextNumber( ) {
    if ( isPrime( n ) ) {
        postMessage( n ); // Message to the main thread
    }
    ++n;
}

//-----------------------------------------------------------------------------

function isPrime( n ) {
    // If n is composite (not prime), one of its divisors will be <= √n
    for ( var i = 2; i <= Math.sqrt( n ); ++i ) {
        if ( n % i === 0 ) { //i divides n evenly (no remainder)
            return false;
        }
    }
    return true;
}

//*****************************************************************************
