var React = require('react');
var actions = require('../actions');
var stores = require('../stores');
var owner = stores.getOwner();

var ChatActions = actions.ChatActions;

var MessageForm = React.createClass({
	sendMessage: function(e){
		e.preventDefault();
		var message = this.refs.message.value.trim();
		if(!message){
			return;
		}
		ChatActions.sendMessage(message, owner, this.props.to, this.props.is_chat_group);
		this.refs.message.value = "";
		return;
	},
	
	render: function(){
		return (
			<form onSubmit={this.sendMessage}>
				<div className="marcoChat">
			 		<textarea ref="message"></textarea>
		 		</div>
		 		<div className="marcoChat">
			 		<input type="submit" value="Send" />
		 		</div>
		 	</form>
		)
	}

});



module.exports = MessageForm;