const data = {
  url: 'http://react-cdp-api.herokuapp.com/movies/',
  offset: 0,
  limit: 12,
  cards: [],
  modals: [],
  inProgress: false
};

function json(response) {  
  return response.json()  
}

fetch(`${data.url}?offset=${data.offset}&limit=${data.limit}`)
  .then(json)  
  .then(function(data) {  
    console.log('Request succeeded with JSON response', data);  
  }).catch(function(error) {  
    console.log('Request failed', error);  
  });