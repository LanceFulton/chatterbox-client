// YOUR CODE HERE:

var counter = 0;

var initialize = function(){

}

var getMessages = function(){
	$.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox',
		type: 'GET',
		data: JSON.stringify({key: 'value'}), 
		contentType: 'application/json',
		success: function (data) {
		  console.log('chatterbox: New Messages Received!');
		  displayMessages(data);
		  console.log(data)
		},
		error: function (data) {
		  console.error('chatterbox: Failed to get new messages!');
		}
	})
};

var postMessage = function(message){
	$.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox',
		type: 'POST',
		data: JSON.stringify(message),
		contentType: 'application/json',
		success: function (data) {
		  console.log('chatterbox: Message sent');
		},
		error: function (data) {
		  console.error('chatterbox: Failed to send message');
		}
	});
};

var createMessage = function (userName, message, room) {

	var message = {
		username: userName,
		text: message,
		roomname: room,
	};

	return message;
}

var displayMessages = function(msg){
	counter++;
	for (var i = 0; i < msg.results.length; i++) {
		var currentMessage = msg.results[i];
		if (currentMessage.roomname === $('select').val()) {
			// create message div
			var messageDiv = $('<div></div>').addClass('chat')
			// create username div
			var usernameDiv = $('<div></div>').addClass('username').text((currentMessage.username).toString() + ":");
			// create text div
			var textDiv = $('<div></div>').addClass('chat').text( (currentMessage.text).toString() );
			// add text div to message div
			$(messageDiv).append(usernameDiv);
			// add message div to chat div
			$(messageDiv).append(textDiv);
			// add username div to message div
			$('#chatDiv').prepend(messageDiv);
		}
	}
}

window.setInterval(getMessages, 2000);