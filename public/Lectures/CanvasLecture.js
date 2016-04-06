/*
  CanvasLecture.js
  David M. Anderson

  Functions for my lecture on HTML5 Canvas
*/

(function() {
//*****************************************************************************

'use strict';

//=============================================================================

setupCanvasDemos( );

//=============================================================================

function getCode( parent ) {
    var pre = $(parent).find( 'pre' ),
        code = pre.text();
    return code.replace( /<\/?b>/, '' ).replace( /&lt;/, '<' ).replace( /&gt;/, '>' );
}

//-----------------------------------------------------------------------------

function setupCanvasDemos( ) {
    $('button.runCanvasCode').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                code = getCode( parent ),
                canvas = $(parent).find( 'canvas' )[0],
                ctx = canvas.getContext( '2d' );
            ctx.save( );
            eval( code );
            ctx.restore( );
        } );

    $('button.clearCanvas').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                canvas = $(parent).find( 'canvas' )[0],
                ctx = canvas.getContext( '2d' );
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
        } );
}


//*****************************************************************************
})();
