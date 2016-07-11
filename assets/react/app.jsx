import React from "react";
import ReactDOM from "react-dom";

var TerminalContent = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var Terminal = React.createClass({
  getInitialState: function() {
    return { items: [], text: '' };
  },
  onChange: function(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    if (this.state.text === 'cls')
      nextItems = [];
    else
      var nextItems = this.state.items.concat([{ text: this.state.text, id: Date.now()}]);

    var nextText = '';
    this.setState({ items: nextItems, text: nextText });
  },
  render: function() {
    return (
      <div id="terminal">
        <div className="topBar">Terminal</div>
        <TerminalContent items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label><b>></b><input onChange={this.onChange} value={this.state.text}/></label>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<Terminal />, document.getElementById('content'));