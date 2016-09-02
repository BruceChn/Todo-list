var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var rootUrl = 'https://my-first-project-c482e.firebaseio.com/'
var Header = require('./header');
var List = require('./list');
var Highcharts = require('highcharts');
require('highcharts/modules/funnel')(Highcharts);
var HighChart = require('./high-chart');


var App = React.createClass({
  mixins:[ReactFire],
  getInitialState:function(){
    return {
      items:{},
      loaded:false,
			options:{
			    chart: {
			      type: 'funnel',
			      marginRight: 100
			    },
			    title: {
			      text: 'React example',
			      x: -50
			    },
			    plotOptions: {
			      series: {
			        dataLabels: {
			          enabled: true,
			          format: '<b>{point.name}</b> ({point.y:,.0f})',
			          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
			          softConnector: true
			        },
			        neckWidth: '30%',
			        neckHeight: '25%'

			        //-- Other available options
			        // height: pixels or percent
			        // width: pixels or percent
			      }
			    },
			    legend: {
			      enabled: false
			    },
			    series: [{
			      name: 'Unique users',
			      data: [
			        ['Website visits', 15654],
			        ['Downloads', 4064],
			        ['Requested price list', 1987],
			        ['Invoice sent', 976],
			        ['Finalized', 846]
			      ]
			    }]
			  },
				container:'container'
    }
  },
  componentWillMount:function()
  {
    this.fb = new FireBase(rootUrl + 'item/');
    this.bindAsObject(this.fb,'items');
    this.fb.on('value',this.HandleDataLoaded);
  },
  render: function() {

    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List

        </h2>
        <Header itemStore = {this.firebaseRefs.items}/>
        <div className={"content " + (this.state.loaded?'loaded':'')}>
          <List items ={this.state.items} />
          {this.deleteButton()}
        </div>
				<div class = "react-app">
					<HighChart container = {this.state.container} options = {this.state.options}/>
				</div>
      </div>
    </div>
		
  },
  HandleDataLoaded:function(){
    this.setState({loaded:true});
  },
  deleteButton:function(){
    if(this.state.loaded)
    {
      return <div className="text-center clear-complete">
      <hr />
      <button type = "button"
        onClick={this.deleteDone}
        className="btn btn-default">
        Clear clear-complete
      </button>
      </div>
    }
  },
  deleteDone:function(){
    for(var key in this.state.items)
    {
      if(this.state.items[key].done === true)
      {
        this.fb.child(key).remove();
      }
    }
  }
});


var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
