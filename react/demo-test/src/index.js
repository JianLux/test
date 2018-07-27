import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SiderDemo from './Navi/Navi';
import './index.css';
// import App from './App';
// App.model(require('./models/products').default);
ReactDOM.render(<SiderDemo />, document.getElementById('root'));
registerServiceWorker();
//registerServiceWorker就是为react项目注册了一个service worker，  
// 用来做资源的缓存，这样你下次访问时，就可以更快的获取资  