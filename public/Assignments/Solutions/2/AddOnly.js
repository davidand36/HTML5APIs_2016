/*
  AddedOnly.js

  Maintains in-memory database. Only implements add.
*/

(function() {
'use strict';
//=============================================================================

var items = [];

displayItems( );

$('#new-item').on( 'click', addNewItem );

//=============================================================================

function displayItems( ) {
    var i, len, item;
    var tr, td;

    $('#items').empty();

    for ( i = 0, len = items.length; i < len; ++i ) {
        item = items[ i ];

        tr = $( '<tr>' );

        td = $( '<td>' );
        td.text( item.name );
        tr.append( td );

        td = $( '<td>' );
        td.text( item.age );
        tr.append( td );

        $('#items').append( tr );
    }

    $('#table-page').show();
    $('#form-page').hide();
}

//=============================================================================

function addNewItem( ) {
    $('#name').val( '' );
    $('#age').val( '' );

    $('#submit').one( 'click', addItem );
    $('#cancel').one( 'click', displayItems );

    $('#table-page').hide();
    $('#form-page').show();

    //=========================================================================

    function addItem( evt ) {
        var newItem = {
            name: $('#name').val(),
            age: $('#age').val()
        };
        items.push( newItem );

        evt.preventDefault( );

        displayItems( );
    }
}

//=============================================================================
})();
