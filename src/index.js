import 'semantic-ui-css/semantic.css';
import './styles.scss';

import 'mobx-react-lite/batchingForReactDom'
import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import App from './components/App';
import stores from './stores';
import axios from 'axios';

configure({enforceActions: 'always'});

axios.defaults.baseURL = 'http://localhost:3005';

const content = (
  <Provider {...stores}>
    <App/>
  </Provider>
);

ReactDOM.render(content, document.getElementById('root'));