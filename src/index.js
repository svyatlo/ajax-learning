import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import makeRequest from './makeRequest';

class RenderFilms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: 0,
    };
  }

  render() {
    return (
      <div>

        <button onClick={makeRequest}>Search</button>
      </div>
    )
  }
}

ReactDOM.render(
  <RenderFilms />,
  document.getElementById('root')
);