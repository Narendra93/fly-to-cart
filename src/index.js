import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../src/assets/css/bootstrap.css';
import '../src/assets/css/easy-responsive-tabs.css';
import '../src/assets/css/font-awesome.css';
import '../src/assets/css/jquery-ui.css';
import '../src/assets/css/style.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
