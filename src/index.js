import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import makeRequest from './makeRequest';

class RenderFilms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmsCollection: [],
      offset: 0
    };

    this.makeRequest = this.makeRequest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  makeRequest() {
    const url = 'http://react-cdp-api.herokuapp.com/movies/';
    const limit = 12;
    const { offset } = this.state;

    fetch(`${url}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())  
    .then(result => {
      result.data.forEach(filmInfo => this.state.filmsCollection.push(filmInfo));
      this.setState({offset: this.state.offset + limit});
      console.log(this.state);
    }).catch(function(error) {
      console.log('Request failed', error);  
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({filmsCollection: [], offset: 0}, () => {this.makeRequest()});
    // console.log('filmsCollection', this.state.filmsCollection);
    // console.log('offset', this.state.offset);
    this.makeRequest();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="findThis" type="text" name="findThis" />
          <input type="submit" value="Search" />
        </form>
        <div className="content"><Cards filmsCollection={this.state.filmsCollection} /></div>
      </div>
    )
  }
}

class Cards extends Component {
  constructor(props) {
    super(props);
    this.getTimeInHours = this.getTimeInHours.bind(this);
    this.formCard = this.formCard.bind(this);
  }

  getTimeInHours(timeInMin) {
    if (!timeInMin) {
      return '--';
    }
    return (Math.floor(timeInMin / 60) || 0) + 'h ' + timeInMin % 60 + 'min ';
  }

  formCard() {
    console.log('props', this.props.filmsCollection);
    // console.log(document.querySelector('form'));
    // const cardHeight = window.innerHeight - document.getElementsByTagName('form')[0].offsetHeight;
    // style={{ height: {cardHeight} }}
    return this.props.filmsCollection.map(filmInfo => 
      <div className="content__item" key={filmInfo.id}>
        <img src={filmInfo.poster_path} />
        <div className="item-description">
          <div className="item-title"><h2>{filmInfo.title}</h2><p>{filmInfo.tagline}</p></div>
          <div className="item-info"><h3>Genre: </h3><p>{filmInfo.genres.join(', ')}</p></div>
          <div className="item-info"><h3>Time: </h3><p>{this.getTimeInHours(filmInfo.runtime)}</p></div>
          <div className="item-info"><h3>Rating: </h3><p>{filmInfo.vote_average} (Votes: {filmInfo.vote_count})</p></div>
          <div className="item-info"><h3>Description: </h3><p>{filmInfo.overview}</p></div>
        </div>
      </div>
    );
  }

  render() {
    const cardTitles = this.formCard();
    return <div className="cards-list">{cardTitles}</div>
  }
}

ReactDOM.render(
  <RenderFilms />,
  document.getElementById('root')
);