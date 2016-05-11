/*
  RestAppDataMgr.js

  Manages the data, maintaining a copy in memory (as an object list),
  and sending requests to Data API.
*/

var app = app || {};

app.dataMgr = (function() {
    'use strict';
    //=========================================================================


    var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
    var collection = 'danderson'; //Use your own!

    //=========================================================================

    function listItems( onSuccess, onFailure ) {
        $.ajax( baseUrl + collection,
                {
                    method: 'GET',
                    success: handleListResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleListResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }            
    }

    //=========================================================================

    function createItem( item, onSuccess, onFailure ) {
        $.ajax( baseUrl + collection,
                {
                    method: 'POST',
                    data: item,
                    success: handleCreateResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleCreateResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }            
    }

    //=========================================================================

    function updateItem( id, item, onSuccess, onFailure ) {
        $.ajax( baseUrl + collection + '/' + id,
                {
                    method: 'PUT',
                    data: item,
                    success: handleUpdateResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleUpdateResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }            
    }

    //=========================================================================

    function deleteItem( id, onSuccess, onFailure ) {
        $.ajax( baseUrl + collection + '/' + id,
                {
                    method: 'DELETE',
                    success: handleDeleteResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleDeleteResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }            
    }

    //=========================================================================

    function reportAjaxError( callback, jqXHR, textStatus, errorThrown ) {
        console.error( 'AJAX error. Status:', textStatus,
                       'error:', errorThrown );
        onFailure( 'AJAX error <br/>' +
                   'Status: ' + textStatus + '<br/>' +
                   'Error: ' + errorThrown );
    }

    //=========================================================================

    return {
        listItems: listItems,
        createItem: createItem,
        updateItem: updateItem,
        deleteItem: deleteItem
    };


    //=========================================================================
})();
