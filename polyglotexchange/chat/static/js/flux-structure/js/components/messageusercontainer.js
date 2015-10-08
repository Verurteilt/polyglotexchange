var React = require('react');

var MessagesUserContainer = React.createClass({
	render: function(){
		return (
				<div className={this.props.className}>
		 			<div className="nameChatContainer">
			 			<span className="nameChat">{this.props.username}</span>
		 			</div>
		 			{this.props.messages_user}
		 			
		 		</div>
			)
	}

});


module.exports = MessagesUserContainer;