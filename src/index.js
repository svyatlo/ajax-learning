import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import makeRequest from './makeRequest';

class RenderFilms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmsCollection: {},
      offset: 0,
      limit: 12,
      inProgress: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const url = 'http://react-cdp-api.herokuapp.com/movies/';
    const { offset, limit } = this.state;
    e.preventDefault();
    console.log('props', this.props);
    this.setState({inProgress: true});

    fetch(`${url}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())  
    .then(result => {
      this.setState({filmsCollection: result, offset: this.state.offset + this.state.limit, inProgress: false})
      console.log('Request succeeded', this.state.filmsCollection);
      console.log(this.state);
    }).catch(function(error) {
      console.log('Request failed', error);  
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="findThis" type="text" name="findThis" />
          <input type="submit" value="Search" />
        </form>
        <div className="content"></div>
      </div>
    )
  }
}

ReactDOM.render(
  <RenderFilms />,
  document.getElementById('root')
);