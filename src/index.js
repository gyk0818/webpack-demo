// ES Moudule 模块引入方式
// CommonJS 模块引入规范
// CMD
// ADM

// webpack 模块打包工具
// js 模块打包工具 -> 

// import Header from './header.js';
// import Sidebar from './sidebar.js';
// import Content from './content.js';

// var Header = require('./header.js');
// var Sidebar = require('./sidebar.js');
// var Content = require('./content.js');

// new Header();
// new Sidebar();
// new Content();


// import avatar from './avatar.jpeg';
// import style from './index.scss';
// import createAvatar from './createAvatar';

// createAvatar();

// var img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar);
// var root = document.getElementById('root');
// root.append(img);


import './index.scss'

var root = document.getElementById('root');
root.innerHTML = '<div class="iconfont icon-success">abc</div>';
