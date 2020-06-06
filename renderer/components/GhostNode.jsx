import React from 'react';

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    var x = this.props.x;
    var y = this.props.y;
    var nodePosition = {
        transform: `translate3d(${x}px, ${y}px, 0px)`
    };

    return (
      <div className={"node ghost-node dragging" + this.props.theme } style={nodePosition}>
        <div className="node-top">
          {this.props.icon != undefined ?
            this.props.icon.includes("lab la-") || this.props.icon.includes("las la-")?
              <i className={`node-icon ${this.props.icon}`}></i>
              :
              <img className="node-icon" src={`/${this.props.icon}`}/>
            : ""
          }
          <input
            className={"node-name " + this.props.theme}
            readOnly={true}
            value={this.props.name}
            // onChange={(event) => this.props.editName(this.props.nodeId, event)}
            // onDoubleClick={(event) => this.setState({readOnly: false, textDraggable: false})}
            // onBlur={(event) => this.setState({readOnly: true, textDraggable: true})}
          />
        </div>
        <div className="node-inner">
          <div className={"node-header bg-" + this.props.color}></div>
          <div className="attribute-container">
            <div className="inputs-container">
              {this.props.inputs.map((input, index) => (
                <div className="input-container" key={index}>
                  <div className={`attribute-pin attribute-type-${input.type} ${this.props.theme}`}></div>
                  <div className="attribute-name-container">
                    <span className="attribute-name">{input.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="outputs-container">
              {this.props.outputs.map((output, index) => (
                <div className="output-container" key={index}>
                  <div className="attribute-name-container">
                    <span className="attribute-name">{output.name}</span>
                  </div>
                  <div className={`attribute-pin attribute-type-${output.type} ${this.props.theme}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
        `}</style>
      </div>
    );
  };
};