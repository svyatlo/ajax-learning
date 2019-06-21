import React from 'react';
import ReactDOM from 'react-dom';
import Input from './renderInput.jsx';
import makeRequest from './makeRequest';

makeRequest();
 ReactDOM.render(
   <Input />,
   document.getElementById('content')
 );