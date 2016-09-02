var React = require('react');
module.exports = React.createClass({
  getInitialState:function(){
    return{
      text:""
    }
  },
  render:function(){
    return <div className= "input-group">
      <input value ={this.state.text} onChange={this.handleChange} type="text" className="form-control"/>
      <span className="input-group-btn">
        <button onClick={this.handleClick} className="btn btn-default" type="button">
          Add
        </button>
      </span>
    </div>
  },
  handleClick:function(){
    //console.log("handleClick");
    //send value of text input to firebase
    this.props.itemStore.push({
      text:this.state.text,
      done:false
    }); 
    this.setState({text:""});
  },
  handleChange:function(event){
    this.setState({text:event.target.value});
  }
});
