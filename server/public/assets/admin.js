$(document).ready(function(){

    $('#userMessage').on('click', '.submit', addMessage);
//the delete button stores the id for the deleted item in the deletedMessage variable. That is then sent the DELETE call further down. Again, the data is displayed minus the deleted item.
    $('#leftMessages').on('click', '.delete', function(){
        $(this).parent().remove();
        var deletedMessage = $(this).data("id");
        deleteMessage(deletedMessage);
        displayData();
    });

    displayData();
});

function addMessage() {
    event.preventDefault();
    var values = {};

    $.each($("#userMessage").serializeArray(), function(i,field){
        values[field.name] = field.value;
    });

    $("#userMessage").find("input[type=text]").val("");

    $.ajax({
        type: 'POST',
        url: '/messages',
        data: values,
        beforeSend: function(){
            console.log("This is before send: ", values);
        },
        success: function(){
            console.log("Ajax Call POST success");
            displayData();
        }
    });
}

function displayData(){
    $.ajax({
        type: 'GET',
        url: '/board',
        success: function(data){
            console.log("This is GET data: ", data);
            appendDOM(data);
        }
    });
}
//leads to the delete route server side.
function deleteMessage(deletedMessage){
    var id = {"id" : deletedMessage};
    console.log("This is delete message going into ajax: ", deletedMessage);
    $.ajax({
        type: 'DELETE',
        url: '/delete',
        data: id,
        success: function(){
            console.log("Message deleted");
        }

    });
}

function appendDOM(data){
    $('#leftMessages').empty();

    for(var i= 0; i<data.length; i++){
        var id = data[i]._id;
        $('#leftMessages').append("<div class='message-box well' data-id='" +
            id + "'></div>");
        var $el=$('#leftMessages').children().last();

        $el.append('<p class="submitted-message">' + data[i].message + '</p>');
        $el.append('<p class="submitted-name">' + data[i].name + '</p>');
        $el.append("<button class='delete btn btn-danger' data-id='" + id + "'>Delete</div>");
    }
}
