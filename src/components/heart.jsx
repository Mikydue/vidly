import React, { Component } from "react";
import fa from "font-awesome";

class Heart extends Component {
  state = {
    isSolid: true
  };

  handleLike() {}

  render() {
    return (
      <i
        class={this.state.isSolid === true ? "fas fa-heart" : "far fa-heart"}
      ></i>
    );
  }
}

export default Heart;
