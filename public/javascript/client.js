$('#user').click(function() {
    event.preventDefault();
    const data = {
        name: $('#name').val(),
        email: $('#email').val()
    }

    $.post('/user',data).then(function(response) {

        $.post('/',data);

    });


});