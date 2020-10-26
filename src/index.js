// import _ from 'lodash';

// console.log(_.join(['a','b','c'], '***'));

function getComponent() {
	return import(/* webpackChunkName: "lodash" */'lodash').then(({ default: _ }) => {
		var element = document.createElement('div');
		element.innerHTML = _.join(['Gui', 'Yukun'], '-');
		return element;
	})
}

getComponent().then(element => {
	document.body.appendChild(element);
});