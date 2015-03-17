// YOUR CODE HERE:

var initialize = function(){

}

var getMessages = function(){
	$.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox',
		type: 'GET',
		// data: JSON.stringify({key: 'value'}), 
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
	for (var i = 0; i < msg.results.length; i++) {
		var currentMessage = msg.results[i];
		if (currentMessage.roomname === $('select').val()) {
			var span = $('<span></span>').addClass('chat').text(JSON.stringify(currentMessage));
			$('#main').append(span);
		}
	}
}

window.setInterval(getMessages, 1000);