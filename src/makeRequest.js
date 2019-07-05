// import createJson from './createJson';

// function makeRequest(url, offset, limit, inProgress) {
//   inProgress = true;
//   console.log(inProgress);
//   fetch(`${url}?offset=${offset}&limit=${limit}`)
//   .then(createJson)  
//   .then(function(data) {  
//     console.log('Request succeeded with JSON response', data);
//   }).catch(function(error) {
//     console.log('Request failed', error);  
//   });
// }

// export default makeRequest;
// import React from 'react';

// export default class Forma extends React.Component {
//   constructor(props) {
//       super(props);

//       this.state = { data: {}, isFetching: true, error: null };
//   }

//   componentDidMount() {
//       fetch('http://react-cdp-api.herokuapp.com/movies/')
//           .then(response => response.json())
//           .then(result => this.setState({data: result, isFetching: false }))
//           .catch(e => {
//             console.log(e);
//             this.setState({data: result, isFetching: false, error: e });
//           });
//   }

//   render() {
//       const { data, isFetching, error } = this.state;
      
//       if (isFetching) return <div>...Loading</div>;

//       if (error) return <div>{`Error: ${e.message}`}</div>;

//       return <h1>{data.goals[0].gs_id}</h1>;
//   }
// }