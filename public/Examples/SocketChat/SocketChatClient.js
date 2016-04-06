/*
  SocketChatClient.js
  David M. Anderson

  Client side of Web Socket (socket.io) chat app
*/

(function() {
'use strict';

//=============================================================================

var signInHtml = $('#signInTemplate').html();
var chatRoomHtml = $('#chatRoomTemplate').html();

// Use global function provided by socket.io client script
//  to make Socket.IO (probably WebSocket) connection to our server:
var socket = io( );

var userName = '';

//-----------------------------------------------------------------------------

start( );

//=============================================================================

function start( ) {
    showSignIn( );
    socket.on( 'error', handleSocketError );
}

//=============================================================================

function showSignIn( ) {
    $('main').html( signInHtml );
    $('#signInButton').on( 'click', signIn );
}
//-----------------------------------------------------------------------------

function signIn( evt ) {
    evt.preventDefault();
    userName = $('#name').val();
    if ( userName.length > 0 ) {
        socket.emit( 'join', userName );
        showChatRoom( );
    }
}

//=============================================================================

function showChatRoom( ) {
    $('main').html( chatRoomHtml );
    $('#sendMessageButton').on( 'click', sendMessage );
    socket.on( 'chat', handleChat );
}

//-----------------------------------------------------------------------------

function sendMessage( evt ) {
    evt.preventDefault();
    var message = $('#message').val();
    $('#message').val( '' );
    socket.emit( 'chat', message );
    displayMessage( userName, message, true );
}

//-----------------------------------------------------------------------------

function handleChat( data ) {
    displayMessage( data.user, data.message, false );
}

//-----------------------------------------------------------------------------

function displayMessage( user, message, fromMe ) {
    var item = $('<li><b>' + user + ':</b> ' + message + '</li>');
    if ( fromMe ) {
        item.addClass( 'from-me' );
    }
    $('#messages').prepend( item );
}

//-----------------------------------------------------------------------------

function handleSocketError( error ) {
    alert( 'Socket.IO error occurred:\n' + JSON.stringify( error ) );
}

//=============================================================================
})();
