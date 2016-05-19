/*
  LocalStorageCrudApp.js

  App that uses Local Storage to manage a simple database
*/

(function() {
'use strict';
//=============================================================================


displayItems( );

$('#new-item').on( 'click', showAddForm );

//=============================================================================

function displayItems( ) {
    var i, len, item;
    var tr;

    $('#items').empty();

    app.dataMgr.listItems( displayItemTable, displayError );

    //-------------------------------------------------------------------------

    function displayItemTable( items ) {
        for ( i = 0, len = items.length; i < len; ++i ) {
            tr = makeTableRow( items[ i ] );
            $('#items').append( tr );
        }

        $('#table-page').show();
        $('#form-page').hide();
    }

    //-------------------------------------------------------------------------

    function makeTableRow( item ) {
        var tr, td, button;

        tr = $( '<tr>' );

        td = $( '<td>' );
        td.text( item.name );
        tr.append( td );

        td = $( '<td>' );
        td.text( item.age );
        tr.append( td );

        td = $( '<td>' );
        button = $( '<button type="button">' );
        button.text( 'Edit' );
        td.append( button );
        button.on( 'click', showEditForm );
        button = $( '<button type="button">' );
        button.text( 'Delete' );
        td.append( button );
        tr.append( td );
        button.on( 'click', confirmAndDelete );

        return tr;

        //---------------------------------------------------------------------

        function showEditForm( ) {
            $('#name').val( item.name );
            $('#age').val( item.age );

            $('#submit').one( 'click', updateItem );
            $('#cancel').one( 'click', displayItems );

            $('#table-page').hide();
            $('#form-page').show();

            //-----------------------------------------------------------------

            function updateItem( evt ) {
                var editedItem = {
                    name: $('#name').val(),
                    age: $('#age').val()
                };

                evt.preventDefault( );
                clearError( );

                app.dataMgr.updateItem( item._id, editedItem,
                                        displayItems, displayError );
            }
        }

        //---------------------------------------------------------------------

        function confirmAndDelete( evt ) {
            evt.preventDefault( );
            clearError( );

            if ( window.confirm( 'Are you sure you want to delete "' +
                                 item.name + '"?' ) ) {
                app.dataMgr.deleteItem( item._id, displayItems, displayError );
            }
        }
    }
}

//=============================================================================

function showAddForm( ) {
    $('#name').val( '' );
    $('#age').val( '' );

    $('#submit').one( 'click', addItem );
    $('#cancel').one( 'click', displayItems );

    $('#table-page').hide();
    $('#form-page').show();

    //-------------------------------------------------------------------------

    function addItem( evt ) {
        var newItem = {
            name: $('#name').val(),
            age: $('#age').val()
        };

        evt.preventDefault( );
        clearError( );

        app.dataMgr.createItem( newItem, displayItems, displayError );
    }
}

//=============================================================================

function displayError( errorMsg ) {
    $('#error-message').html( errorMsg );
}

//-----------------------------------------------------------------------------

function clearError( ) {
    $('#error-message').html( '' );
}


//=============================================================================
})();
