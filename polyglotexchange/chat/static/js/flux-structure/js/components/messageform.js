var React = require('react');

var MessageForm = React.createClass({
	sendMessage: function(e){
		e.preventDefault();
		var message = React.findDOMNode(this.refs.message).value.trim();
		if(!message){
			return;
		}
		this.props.sendMessageNodeJS({message:message});
		React.findDOMNode(this.refs.message).value = "";
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
			/*<form className="MessageForm" onSubmit={this.sendMessage}>
				<input type="text" placeholder="Message" ref="message" />
			</form>*/
		)
	}

});



module.exports = MessageForm;