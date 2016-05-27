/*
  Ellipses.js
*/

(function() {
'use strict';
//=============================================================================


var maxRadius = 200; //pixels
var radiusGap = 10;  //pixels
var numEllipses = maxRadius / radiusGap;
var animTime = 2000; //millisec

var paper = Raphael( 'svg-holder', 2 * maxRadius, 2 * maxRadius );
var ellipses = createEllipses( );
var animsRunning = true;

$('#svg-holder').on( 'click', toggleAnims );

//=============================================================================

function createEllipses( ) {
    var ellipses = [];
    var i;

    for ( i = 1; i <= numEllipses; ++i ) {
        ellipses.push( createEllipse( i ) );
    }
    return ellipses;

    //-------------------------------------------------------------------------

    function createEllipse( i ) {
        var r = i * radiusGap;
        var center = maxRadius;
        var ellipse = paper.ellipse( center, center, r, r );
        var anims = [];
        var animIdx = 0;
        anims[ 0 ] = Raphael.animation( { rx: 0 },
                                        animTime,
                                        'easeIn',
                                        updateAnim );
        anims[ 1 ] = Raphael.animation( { rx: r },
                                        animTime,
                                        'easeOut',
                                        updateAnim );
        anims[ 2 ] = Raphael.animation( { ry: 0 },
                                        animTime,
                                        'easeOut',
                                        updateAnim );
        anims[ 3 ] = Raphael.animation( { ry: r },
                                        animTime,
                                        'easeOut',
                                        updateAnim );
        startAnim( );
        return ellipse;

        //---------------------------------------------------------------------

        function startAnim( ) {
            var delayGap = animTime / numEllipses;
            var anim = anims[ 0 ].delay( animTime  -  i * delayGap );
            ellipse.animate( anim );
        }

        //---------------------------------------------------------------------

        function updateAnim( ) {
            animIdx = (animIdx + 1) % 4;
            ellipse.animate( anims[ animIdx ] );
        }
    }
}

//=============================================================================

function toggleAnims( ) {
    if ( animsRunning ) {
        ellipses.forEach( function( ellipse ) {
            ellipse.pause( );
        } );
    } else {
        ellipses.forEach( function( ellipse ) {
            ellipse.resume( );
        } );
    }
    animsRunning = ! animsRunning;
}


//=============================================================================
})();
