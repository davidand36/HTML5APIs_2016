$('#ajaxForm').submit(
    function( evt )
    {
        var fields = $('#ajaxForm').serializeArray();
        evt.preventDefault();
        $.post( '/form',
                JSON.stringify( fields ),
                function handleResponse( serverData )
                {
                    $('#ajaxResponse').html( serverData );
                },
                'text' );
    } );
