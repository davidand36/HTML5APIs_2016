/*
  SVG_Lecture.js
  David M. Anderson

  Functions for my lecture on SVG
*/

(function() {
//*****************************************************************************

'use strict';

//=============================================================================

setupSvgDemos( );

//=============================================================================

function getCode( parent ) {
    var pre = $(parent).find( 'pre' ),
        code = pre.text();
    return code.replace( /<\/?b>/, '' ).replace( /&lt;/, '<' ).replace( /&gt;/, '>' );
}

//-----------------------------------------------------------------------------

function setupSvgDemos( ) {
    $('button.runSvgCode').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                code = getCode( parent ),
                svgHolder = $(parent).find( '.svgHolder' )[0],
                paper = Raphael( svgHolder, 300, 150 );
            eval( code );
        } );

    $('button.runD3Code').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                code = getCode( parent ),
                svgHolder = $(parent).find( '.svgHolder' )[0];
            eval( code );
        } );

    $('button.clearSvg').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                svgHolder = $(parent).find( '.svgHolder' );
            svgHolder.empty( );
        } );
}


//*****************************************************************************
})();
