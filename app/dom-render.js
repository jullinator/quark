import React from 'react';
import ReactDOM from 'react-dom';
import Root from './realtime-editor.jsx';

window.onload = function(){
  ReactDOM.render(<Root />, document.getElementById('root'));
}
