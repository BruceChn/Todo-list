var React = require('react');
var HighCharts = require('highcharts');

module.exports = React.createClass({
	componentDidMount:function(){
		console.log("ishere");
		if(this.props.modules)
		{
			this.props.modules.forEach(function (module)
			{
				module(HighCharts);
			});
		}
		this.chart = new HighCharts[this.props.type||"Chart"](
			this.props.container,
			this.props.options
		);
	},
	componentWillUnmount:function(){
		this.chart.destroy();
	},
	render:function(){
		return <div id = {this.props.container}>
		</div>
	}

})
