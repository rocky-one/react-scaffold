import ReactDOM from 'react-dom';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import Layout from './layout'
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			layoutType: 'login'
		}
	}
	onChangeLayout = (layoutType) => {
		this.setState({
			layoutType
		})
	}
	render() {
		return (
			<div>
				<Layout type={this.state.layoutType} />
			</div>
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
