var React = require('react');
var stores = require('../stores');
var ChatGroupStore = stores.ChatGroupStore;
var UserBox = require('./userbox');


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
                        <UserBox />
                    </div>
                </div>
            )
    }
});


var MainContainer = React.createClass({
    getInitialState: function () {
        return {};
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
        return (
            <div>
                <ChatGroupContainer chatboxes={this.state.chatboxes} />
                <ColumnaDerecha />
            </div>
        )
    }
});


module.exports = MainContainer;