// YOUR CODE HERE:
var app = {};

var counter = 0;

app.init = function(){


}

app.fetch = function(){
	$.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox',
		type: 'GET',
		data: {"order": "-createdAt"},//, "where":'{"createdAt": {"$gt": "latestTime"} }' },
		contentType: 'application/json',
		success: function (data) {
		  console.log('chatterbox: New Messages Received!');
		  console.log(data);
		  displayMessages(data);
		},
		error: function (data) {
		  console.error('chatterbox: Failed to get new messages!');
		}
	})
};

app.send = function(message){
	$.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox',
		type: 'POST',
		data: JSON.stringify(message),
		contentType: 'application/json',
		success: function (data) {
			console.log('Send Data: ', data)
		  console.log('chatterbox: Message sent');
		},
		error: function (data) {
		  console.error('chatterbox: Failed to send message');
		}
	});
};


app.addMessage = function () {

	var user = location.search.slice(10,location.search.length);

	var message = {
		username: user,
		text: $('#input').val(),
		roomname: $('#roomSelect').val(),
	};
	app.send(message);
}

app.clearMessages = function () {
	//$('#chats');
}

app.addRoom = function(newRoom) {
	var nRoom = $('<selector></selector>').text(newRoom);
	$('#roomSelect').append(nRoom);
}

$(document).ready(function() {
	var $userLink = location.search.slice(10,location.search.length);
	$('#button').on( 'click', function(){
		app.addMessage();
		$('#input').val("");
	} );
	$($userLink).on('click', function () {
		console.log('click')
	});

});

var x = 0;
var displayMessages = function(msg){
	counter++;
	//var latestTime = msg.results[0].createdAt;
	for (var i = 0; i < msg.results.length; i++) {
		var currentMessage = msg.results[i];
		if (currentMessage.roomname === $('roomSelect').val()) {
			// create message div
			var messageDiv = $('<div></div>').addClass('chat')
			// create username div
			var usernameDiv = $('<div></div>').addClass('username').text((currentMessage.username) + ":");
			// create text div
			var textDiv = $('<div></div>').text( (currentMessage.text) );
			// add text div to message div
			$(messageDiv).append(usernameDiv);
			// add message div to chat div
			$(messageDiv).append(textDiv);
			// add username div to message div
			$('#chats').prepend(messageDiv);
			var messageTime = currentMessage.createdAt;
		}
	}
}
window.setInterval(app.fetch, 2000);






