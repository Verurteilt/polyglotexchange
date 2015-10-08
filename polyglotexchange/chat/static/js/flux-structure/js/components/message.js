var React = require('react');

var Message = React.createClass({
	render: function(){
		return (
				<p>{this.props.children}</p>
			)
	}
});


module.exports = Message;