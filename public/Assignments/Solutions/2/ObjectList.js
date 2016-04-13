/*
  ObjectList.js

  Maintains in-memory database
*/

(function() {
'use strict';
//=============================================================================

var items = [];
var nextId = 1000;

displayItems( );

$('#new-item').on( 'click', addNewItem );
$('#items').on( 'click', '.edit', editItem );
$('#items').on( 'click', '.delete', confirmAndDeleteItem );

//=============================================================================

function displayItems( ) {
    var i, len, item;
    var tr, td, button;

    $('#items').empty();

    for ( i = 0, len = items.length; i < len; ++i ) {
        item = items[ i ];

        tr = $( '<tr data-id="' + item.id + '">' );

        td = $( '<td>' );
        td.text( item.name );
        tr.append( td );

        td = $( '<td>' );
        td.text( item.age );
        tr.append( td );

        td = $( '<td>' );
        button = $( '<button type="button" class="edit">' );
        button.text( 'Edit' );
        td.append( button );
        button = $( '<button type="button" class="delete">' );
        button.text( 'Delete' );
        td.append( button );
        tr.append( td );

        $('#items').append( tr );
    }

    $('#table-page').show();
    $('#form-page').hide();
}

//=============================================================================

function addNewItem( ) {
    addOrEditItem( );
}

//=============================================================================

function editItem( evt ) {
    var i = indexOfEventItem( evt );
    if ( i >= 0 ) {
        addOrEditItem( items[ i ] );
    }
}

//-----------------------------------------------------------------------------

function confirmAndDeleteItem( evt ) {
    var i = indexOfEventItem( evt );
    if ( i >= 0 ) {
        if ( window.confirm( 'Are you sure you want to delete "' +
                             items[ i ].name + '"?' ) ) {
            deleteItem( i );
            displayItems( );
        }
    }

    //-------------------------------------------------------------------------

    function deleteItem( idx ) {
        items.splice( idx, 1 );
    }
}

//-----------------------------------------------------------------------------

function indexOfEventItem( evt ) {
    var btn = evt.target;
    var tr = $(btn).closest( 'tr' );
    var id = tr.attr( 'data-id' );
    var i, len;

    for ( i = 0, len = items.length; i < len; ++i ) {
        if ( items[ i ].id === id ) {
            return i;
        }
    }
    return -1;
}

//=============================================================================

function addOrEditItem( item ) {
    if ( item ) {
        $('#name').val( item.name );
        $('#age').val( item.age );
    } else {
        $('#name').val( '' );
        $('#age').val( '' );
    }
    $('#submit').one( 'click', addOrUpdateItem );
    $('#cancel').one( 'click', displayItems );

    $('#table-page').hide();
    $('#form-page').show();

    //=========================================================================

    function addOrUpdateItem( evt ) {
        var newItem;

        evt.preventDefault( );

        if ( item ) {
            item.name = $('#name').val();
            item.age = $('#age').val();
        } else {
            newItem = {
                id: (nextId++).toString(),
                name: $('#name').val(),
                age: $('#age').val()
            };
            items.push( newItem );
        }
        displayItems( );
    }
}

//=============================================================================
})();
