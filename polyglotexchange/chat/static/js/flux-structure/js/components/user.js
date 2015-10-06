var React = require('react');


var User = React.createClass({
	render: function(){
		 var className = "user " + this.props.gender.toLowerCase();
		return (
			<li>
				<span className={className}>{this.props.children}</span>
				<span>{this.props.languages}</span>
			</li>
			)
	}
});

module.exports = User;