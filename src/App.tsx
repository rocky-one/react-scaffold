import ReactDOM from 'react-dom';
import React from 'react';
import { hot } from 'react-hot-loader/root';
 
class App extends React.Component {
	render() {
		return (
			<div>appssdvwww</div>
		)
	}
}
// if (module.hot) {
// 	hot(module)(() => {
// 		return App;
// 	});
// }

const render = (Component: React.ComponentType) => {
	ReactDOM.render(
		<Component />,
		document.getElementById('app')
	);
};

render(hot(App));
