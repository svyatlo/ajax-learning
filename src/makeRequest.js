import createJson from './createJson';

const data = {
  url: 'http://react-cdp-api.herokuapp.com/movies/',
  offset: 0,
  limit: 12,
  cards: [],
  modals: [],
  inProgress: false
};

function makeRequest() {
  data.inProgress = true;
  console.log(data.inProgress);
  fetch(`${data.url}?offset=${data.offset}&limit=${data.limit}`)
  .then(createJson)  
  .then(function(data) {  
    console.log('Request succeeded with JSON response', data);
  }).catch(function(error) {
    console.log('Request failed', error);  
  });
}

export default makeRequest;