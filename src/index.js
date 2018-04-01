import React from 'react';
import ReactDOM from 'react-dom';
import "@atlaskit/css-reset"

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import "./index.scss";

import data from "./data";

ReactDOM.render(<App data={data} />, document.getElementById('root'));
registerServiceWorker();
