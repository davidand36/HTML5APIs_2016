/*
  Lectures.js
  David M. Anderson

  Functions for my lectures on HTML5 APIs
*/

(function() {
//*****************************************************************************

'use strict';

//=============================================================================

setupAccordions( );
setupAccordionToggle( );
setupDemos( );

//=============================================================================

function setupAccordions( ) {
    $('div.accordion').accordion( {
        heightStyle: 'content'
    } );

    $('div.accordion.h1').accordion( 'option', 'header', 'h1' );
    $('div.accordion.h2').accordion( 'option', 'header', 'h2' );
    $('div.accordion.h3').accordion( 'option', 'header', 'h3' );
    $('div.accordion.h4').accordion( 'option', 'header', 'h4' );
    $('div.accordion.h5').accordion( 'option', 'header', 'h5' );
    
    $('div.accordion.h1').accordion( 'option', 'active', 0 );
}

//-----------------------------------------------------------------------------

function setupAccordionToggle( ) {
    var buttonTexts = {
        expand: "Expand sections",
        collapse: "Collapse sections"
    };
    $('#accordionToggle').text( buttonTexts.expand );
    $('#accordionToggle').click(
        function( event ) {
            var target = $(event.target),
                txt = target.text();
            if ( txt === buttonTexts.expand ) {
                $('.accordion').accordion( 'destroy' );
                target.text( buttonTexts.collapse );
            } else {
                setupAccordions( );
                target.text( buttonTexts.expand );
            }
        }
    );
}

//=============================================================================

function getCode( parent ) {
    var pre = $(parent).find( 'pre' ),
        code = pre.text();
    return code.replace( /<\/?b>/, '' ).replace( /&lt;/, '<' ).replace( /&gt;/, '>' );
}

//-----------------------------------------------------------------------------

function setupDemos( ) {
    $('button.runCode').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                code = getCode( parent );
            eval( code );
        } );
}

//*****************************************************************************
})();
