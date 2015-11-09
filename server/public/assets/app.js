$(document).ready(function(){
//when the submit button is clicked, it triggers addMessage, which is the post call to the server to add the message in the form to the sever.
    $('#userMessage').on('click', '.submit', addMessage);

    displayData();//displayData is a get call that calls for all messages current stored in the server.
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

//appends any data sent from displayData. First action is to empty the messages area so that there is no duplication.
function appendDOM(data){
    $('#leftMessages').empty();

    for(var i= 0; i<data.length; i++){
        var id = data[i]._id;
        $('#leftMessages').append("<div class='message-box well' data-id='" +
            id + "'></div>");
        var $el=$('#leftMessages').children().last();

        $el.append('<p class="submitted-message">' + data[i].message + '</p>');
        $el.append('<p class="submitted-name">' + data[i].name + '</p>');
    }
}
