/*
  AudioVideoLecture.js
  David M. Anderson

  Functions for my lecture on HTML5 Audio and Video
*/

(function() {
//*****************************************************************************

'use strict';

//=============================================================================

setupAudioDemos( );
setupVideoDemos( );

//=============================================================================

function getCode( parent ) {
    var pre = $(parent).find( 'pre' ),
        code = pre.text();
    return code.replace( /<\/?b>/, '' ).replace( /&lt;/, '<' ).replace( /&gt;/, '>' );
}

//-----------------------------------------------------------------------------

function getBestFormat( medium, formats ) {
    var responses = [ 'probably', 'maybe' ];
    var element = document.createElement( medium ),
        r, numResponses = responses.length, response,
        f, numFormats = formats.length, format,
        answer;

    for ( r = 0; r < numResponses; ++r ) {
        response = responses[ r ];
        for ( f = 0; f < numFormats; ++f ) {
            format = formats[ f ];
            answer = element.canPlayType( format.mime );
            if ( answer === response ) {
                return format.ext;
            }
        }
    }
    return null;
}

//.............................................................................

function getBestAudioFormat( ) {
    var formats = [
        { ext: 'ogg', mime: 'audio/ogg; codecs="vorbis"' },
        { ext: 'mp3', mime: 'audio/mpeg' }
    ];
    return getBestFormat( 'audio', formats );
}

//.............................................................................

function getBestVideoFormat( ) {
    var formats = [
        { ext: 'webm', mime: 'video/webm' },
        { ext: 'ogv', mime: 'video/ogg; codecs="theora, vorbis"' },
        { ext: 'mp4', mime: 'video/mp4' }
    ];
    return getBestFormat( 'video', formats );
}

//.............................................................................

function setupAudioDemos( ) {
    var soundNames = [ 'computer', 'asaying', 'hatecomp',
                       'Diane_Nalini_Kiss_me_like_that', 'maketenlouder',
                       "Ella_Fitzgerald_Let's_Do_It_(Let's_Fall_in_Love)",
                       'fw11', 'pcloadletter' ],
        sounds = { },
        audio,
        i, lim;

    var audioFormat = getBestAudioFormat( );

    for ( i = 0, lim = soundNames.length; i < lim; ++i ) {
        audio = new Audio( 'audio/' + soundNames[ i ] + '.' + audioFormat );
        sounds[ soundNames[ i ] ] = audio;
    }

    $('button.runAudioCode').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                code = getCode( parent );
            eval( code );
        } );

    $('button.stopAudio').click(
        function( evt ) {
            var i, lim;
            for ( i = 0, lim = soundNames.length; i < lim; ++i ) {
                sounds[ soundNames[ i ] ].pause( );
                sounds[ soundNames[ i ] ].currentTime = 0;
            }
        } );
}


//.............................................................................

function setupVideoDemos( ) {
    var videoNames = [ 'wannaworktogether' ],
        videos = { },
        video,
        i, lim;

    var videoFormat = getBestVideoFormat( );

    for ( i = 0, lim = videoNames.length; i < lim; ++i ) {
        video = document.createElement( 'video' );
        video.src = 'video/' + videoNames[ i ] + '.' + videoFormat;
        videos[ videoNames[ i ] ] = video;
    }

    $('button.runVideoCode').click(
        function( evt ) {
            var parent = $(evt.target).parent(),
                code = getCode( parent );
            eval( code );
        } );
}

//*****************************************************************************
})();
