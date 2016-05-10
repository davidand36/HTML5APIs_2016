/*
  CrudForms.js

  Handles basic CRUD forms
*/

(function() {
'use strict';

//=============================================================================

var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
var collection = 'danderson'; //Use your own!

$('#create-submit').on( 'click', createItem );
$('#list-submit').on( 'click', listItems );
$('#read-submit').on( 'click', readItem );
$('#update-submit').on( 'click', updateItem );
$('#delete-submit').on( 'click', deleteItem );

//=============================================================================

function createItem( evt ) {
    var name = $('#create-name').val();
    var age = $('#create-age').val();

    clearErrorMessage( );
    evt.preventDefault( );

    $.ajax( baseUrl + collection,
            {
                method: 'POST',
                data: {
                    name: name,
                    age: age
                },
                success: function( data ) {
                    var msg;
                    console.log( 'Data received:', data );
                    if ( data.error ) {
                        displayErrorMessage( data.error );
                    } else {
                        msg = 'Created ID=' + data.created;
                        $('#create-result').html( msg );
                    }
                },
                error: handleAjaxError
            } );
}

//=============================================================================

function listItems( evt ) {
    clearErrorMessage( );
    evt.preventDefault( );

    $.ajax( baseUrl + collection,
            {
                method: 'GET',
                success: function( data ) {
                    var msg;
                    console.log( 'Data received:', data );
                    if ( data.error ) {
                        displayErrorMessage( data.error );
                    } else {
                        msg = '<ul>';
                        data.forEach( function( item ) {
                            msg += '<li>' +
                                'ID: ' + item._id +
                                '  Name: ' + item.name +
                                '  Age: ' + item.age +
                                '</li>';
                        } );
                        msg += '</ul>';
                        $('#list-result').html( msg );
                    }
                },
                error: handleAjaxError
            } );
}

//=============================================================================

function readItem( evt ) {
    var id = $('#read-id').val();

    clearErrorMessage( );
    evt.preventDefault( );

    $.ajax( baseUrl + collection + '/' + id,
            {
                method: 'GET',
                success: function( data ) {
                    var msg;
                    console.log( 'Data received:', data );
                    if ( data.error ) {
                        displayErrorMessage( data.error );
                    } else {
                        msg = 'ID: ' + data._id + '<br/>' +
                            'Name: ' + data.name + '<br/>' +
                            'Age: ' + data.age;
                        $('#read-result').html( msg );
                    }
                },
                error: handleAjaxError
            } );
}

//=============================================================================

function updateItem( evt ) {
    var id = $('#update-id').val();
    var name = $('#update-name').val();
    var age = $('#update-age').val();

    clearErrorMessage( );
    evt.preventDefault( );

    $.ajax( baseUrl + collection + '/' + id,
            {
                method: 'PUT',
                data: {
                    name: name,
                    age: age
                },
                success: function( data ) {
                    var msg;
                    console.log( 'Data received:', data );
                    if ( data.error ) {
                        displayErrorMessage( data.error );
                    } else {
                        msg = 'Updated ID=' + data.updated;
                        $('#update-result').html( msg );
                    }
                },
                error: handleAjaxError
            } );
}

//=============================================================================

function deleteItem( evt ) {
    var id = $('#delete-id').val();

    clearErrorMessage( );
    evt.preventDefault( );

    $.ajax( baseUrl + collection + '/' + id,
            {
                method: 'DELETE',
                success: function( data ) {
                    var msg;
                    console.log( 'Data received:', data );
                    if ( data.error ) {
                        displayErrorMessage( data.error );
                    } else {
                        msg = 'Deleted ID=' + data.deleted;
                        $('#delete-result').html( msg );
                    }
                },
                error: handleAjaxError
            } );
}

//=============================================================================

function handleAjaxError( jqXHR, textStatus, errorThrown ) {
    console.error( 'AJAX error. Status:', textStatus, 'error:', errorThrown );
    displayErrorMessage( 'AJAX error <br/>' +
                         'Status: ' + textStatus + '<br/>' +
                         'Error: ' + errorThrown );
}

//-----------------------------------------------------------------------------

function displayErrorMessage( msg ) {
    $('#error-message').html( msg );
}

//-----------------------------------------------------------------------------

function clearErrorMessage( ) {
    $('#error-message').html( '' );
}

//=============================================================================
})();
