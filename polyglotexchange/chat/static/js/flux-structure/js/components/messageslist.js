var React = require('react');

var MessagesList = React.createClass({
	componentDidUpdate: function(){
		var node = React.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
	},
	render: function(){
		var owner = this.props.owner.toString();
		var class_ = "";
		var username = "";
		var  messages = []
		var last_message_sender = "";//this.props.last_message_sender;
		var messages = []
		var muc = [];
		var men = this.props.messages;
		var temp = []
		
		if (!!men.length) {
			var lm = last_message_sender;
			var tmp_msgs = [];
			var tmp2 = [];
			men.map(function(message){
				if(message.from_id.toString() == owner){
					class_ = "marcoChat chat2";
					username = "You";
				}else{
					class_ = "marcoChat";
					username = message.username;
				}
				if(message.from_id.toString() == lm){//&& men.indexOf(message) != men.length-1){ // Es del mismo qu el anterior
					tmp_msgs.push(<Message >{message.message}</Message>);
					tmp2.push({"className": class_, "username": username});
				}else if(message.from_id.toString() != lm){ // No es el mismo 
					tmp_msgs = [];
					tmp2 = [];
					tmp_msgs.push(<Message >{message.message}</Message>);
					tmp2.push({"className": class_, "username": username});
					lm = message.from_id;
				}
				if(men.indexOf(message) == men.length-1){
					messages.push(tmp_msgs);
					temp.push(tmp2);
				}else if((message.from_id.toString() != men[men.indexOf(message)+1].from_id.toString()) ){
					messages.push(tmp_msgs);
					temp.push(tmp2);
				}
			});
		}
		if(!!messages.length){
			messages.map(function(message){
				var index = messages.indexOf(message);
				var _class = temp[index][0].className;
				var username = temp[index][0].username;
				muc.push(<MessagesUserContainer className={_class} username={username} messages_user={message}/>);
			});
		}
		return (
				<div className="chatScroll">
					{muc}
				</div>
			)
	}
});

module.exports = MessagesList;