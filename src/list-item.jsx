var React = require('react');
var FireBase = require('firebase');
var rootUrl = 'https://my-first-project-c482e.firebaseio.com/';
module.exports  = React.createClass({
  getInitialState:function(){
    return{
      text:this.props.item.text,
      done:this.props.item.done,
      textChange:false
    }
  },
  componentWillMount:function(){
    this.fb = new FireBase(rootUrl + "item/" + this.props.item.key);
  }
  ,
  render:function(){

    return <div className = "input-group">
      <sapn className="input-group-addon">
        <input type ="checkBox" onChange={this.handleDone} checked={this.state.done}/>
      </sapn>
      <input type ="text"
        className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}
        disabled={this.state.done}/>
      <span className="input-group-btn">
        {this.changeButtons()}
        <button className="btn btn-default" onClick={this.handleDeleted}>
          Delete
        </button>
      </span>
    </div>
  },
  changeButtons:function(){
    if(!this.state.textChange)
    {

      return null;
    }
    else{
      return <span>
            <button className="btn btn-default" onClick={this.handleSave}>Save</button>
            <button className="btn btn-default" onClick={this.handleUndo}>Undo</button>
            </span>
      }
  },
  handleDone:function(event){
    var update = event.target.checked;
    this.setState({done:update});
    this.fb.update({done:update});
  },
  handleDeleted:function(event)
  {
    this.fb.remove();
  },
  handleTextChange:function(event)
  {
    this.setState({textChange:true});
    this.setState({text:event.target.value});
  },
  handleSave:function(){
    this.fb.update({text:this.state.text});

    this.setState({textChange:false});
  },
  handleUndo:function(){
    this.setState({text:this.props.item.text,
                  textChange:false});
  }
})
