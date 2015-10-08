var React = require('react');
var stores = require('../stores');
var ChatGroupStore = stores.ChatGroupStore;
var UserBox = require('./userbox');
var GroupBox = require('./groupbox');

var ChatGroupContainer = React.createClass({
    getInitialState: function () {
        return ChatGroupStore.getState();
    },
    componentDidMount: function(){
        ChatGroupStore.addChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState(ChatGroupStore.getState())
    },
    componentWillUnmount: function(){
        ChatGroupStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var chatboxes = [];
        if(Object.keys(this.state.chatBoxes).length){
            chatboxes = Object.values(this.state.chatBoxes);    
        }        
        return (
            <div  className="chatGroupContainer">
            	{chatboxes}
            </div>
        )
    }
});

var ColumnaDerecha = React.createClass({
    render: function(){
        return (

                <div className="wrapper clearfix">
                    <div className="columnaDerecha"> 
                        <UserBox />
                        <GroupBox />
                    </div>
                </div>
            )
    }
});


var MainContainer = React.createClass({

    render: function() {
        return (
            <div>
                <ChatGroupContainer />
                <ColumnaDerecha />
            </div>
        )
    }
});


module.exports = MainContainer;