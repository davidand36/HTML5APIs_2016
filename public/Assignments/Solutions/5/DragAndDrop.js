/*
  DragAndDrop.js
*/

(function() {
'use strict';

//=============================================================================


$('.draggable').on( 'mousedown', startDrag );

//=============================================================================

function startDrag( evt ) {
    var thing = $(evt.target);
    var thingLeft = parseInt( thing.css( 'left' ), 10 );
    var thingTop = parseInt( thing.css( 'top' ), 10 );
    var diffX = thingLeft - evt.pageX;
    var diffY = thingTop - evt.pageY;
    var maxX = $('#arena').width() - thing.width() + 1;
    var maxY = $('#arena').height() - thing.height() + 1;

    $(document).on( 'mousemove', drag );
    $(document).on( 'mouseup', stopDrag );

    //-------------------------------------------------------------------------

    function drag( evt ) {
        var left = evt.pageX + diffX;
        var top = evt.pageY + diffY;
        left = Math.min( Math.max( 0, left ), maxX );
        top = Math.min( Math.max( 0, top ), maxY );
        thing.css( {
            left: left + 'px',
            top: top + 'px'
        } );
    }

    //-------------------------------------------------------------------------

    function stopDrag( evt ) {
        $(document).off( 'mousemove' );
        $(document).off( 'mouseup' );
    }
}


//=============================================================================
})();
