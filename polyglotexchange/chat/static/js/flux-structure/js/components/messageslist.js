var React = require('react');
var ReactDOM = require('react-dom');
var stores = require('../stores');
var MessagesUserContainer = require('./messageusercontainer');
var Message = require('./message');
var ChatStore = stores.ChatStore;
var owner = stores.getOwner();

var MessagesList = React.createClass({

	getInitialState: function(){
		return {};
	},
	componentDidUpdate: function(){
		var node = ReactDOM.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
	},
	muc: [],
	orderMessages: function(){
		var class_ = "";
		var username = "";
		var messages = []
		var muc = [];
		var state_chat = ChatStore.getState(owner, this.props.to);
		var men = state_chat['messages'];
		var last_message_sender = state_chat['last_sender'];
		var temp = []
		
		if (!!men.length) {
			var lm = last_message_sender;
			var tmp_msgs = [];
			var tmp2 = [];
			men.map(function(message){
				if(message.from == owner){
					class_ = "marcoChat chat2";
					username = "You";
				}else{
					class_ = "marcoChat";
					username = message.from;
				}
				if(message.from == lm){
					var key = username + '-' + men.indexOf(message);
					tmp_msgs.push(<Message key={key}>{message.message}</Message>);
					tmp2.push({"className": class_, "username": username});
				}else if(message.from != lm){
					tmp_msgs = [];
					tmp2 = [];
					var key = username + '-' + men.indexOf(message);
					tmp_msgs.push(<Message key={key}>{message.message}</Message>);
					tmp2.push({"className": class_, "username": username});
					lm = message.from;
				}
				if(men.indexOf(message) == men.length-1){
					messages.push(tmp_msgs);
					temp.push(tmp2);
				}else if((message.from != men[men.indexOf(message)+1].from) ){
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
				var key = username + '-' + message.length;
				muc.push(<MessagesUserContainer key={key} className={_class} username={username} messages_user={message}/>);
			});
		}
		this.muc = muc;
	},
	render: function(){
		this.orderMessages();
		return (
				<div className="chatScroll" >
					{this.muc}
				</div>
			)
	}
});

module.exports = MessagesList;