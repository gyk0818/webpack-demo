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


// import './index.scss'

// var root = document.getElementById('root');
// root.innerHTML = '<div class="iconfont icon-success">abc</div>';

// console.log('hello world!');

// 3-9
// import './style.css'

// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);
// btn.onclick = function() {
//     var div = document.createElement('div');
//     div.innerHTML = 'item';
//     document.body.appendChild(div);
// }

// // 3-10
// import counter from './counter';
// import number from './number';

// counter();
// number();

// if(module.hot) {
//     module.hot.accept('./number.js', () => {
//         document.body.removeChild(document.getElementById('number'));
//         number();
//     })
// }

// 3-11
// UI组件库开发时不能使用babel-polyfill，因为会生成全局变量，会污染全局环境
// import "@babel/polyfill";

const arr = [
    new Promise(() => {}),
    new Promise(() => {})
];

arr.map(item => {
    console.log(item);
})