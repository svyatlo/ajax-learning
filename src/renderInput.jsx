import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <form>
        <input id="findThis" type="text" name="findThis"></input>
        <input type="submit" value="Search"></input>
      </form>
    );
  }
}

export default Input;