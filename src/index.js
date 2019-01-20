import ReactDOM from "react-dom";
import React from 'react';
import Survey from './components/Survey';

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<Survey />, wrapper) : false;