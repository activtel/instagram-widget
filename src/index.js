import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InstagramWidget from './instagramWidget';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<InstagramWidget />, document.getElementById('root'));
registerServiceWorker();
