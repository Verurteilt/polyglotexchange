var ChatGroupContainer = React.createClass({
    render: function() {
        return (
            <div  className="chatGroupContainer">
            	{this.props.chatboxes}
            </div>
        )
    }
});

var ColumnaDerecha = React.createClass({
    render: function(){
        return (

                <div className="wrapper clearfix">
                    <div className="columnaDerecha"> 
                        <UserBox onClickUser={this.props.onClickUser}/>
                        <GroupsBox onClickGroup={this.props.onClickGroup} />
                    </div>
                </div>
            )
    }
});


var MainContainer = React.createClass({
    getInitialState: function () {
        return { chatboxes: [], talking_to: [], owner: this.props.owner};
    },
    renderChatbox: function (to_user, group_name) {
        var chatboxes = this.state.chatboxes;
        var talking_to = this.state.talking_to;
        var owner = this.props.owner
        var to_user_username = to_user
        if(group_name):
            to_user_username = group_name
        if(talking_to.indexOf(to_user) == -1){
            chatboxes.push(<ChatBox user={owner} to={to_user} to_user_username={group_name});
            this.setState({chatboxes: chatboxes});
            talking_to.push(to_user)
        }
    },
    render: function() {
        return (
            <div>
                <ChatGroupContainer chatboxes={this.state.chatboxes} />
                <ColumnaDerecha onClickChat={this.renderChatbox}/>
            </div>
        )
    }
});

