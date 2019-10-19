import ReactDOM from 'react-dom';
import React from 'react';
import {
	BrowserRouter as Router,
	withRouter,
} from "react-router-dom"
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
	onLogin = () => {
		const { history } = this.props;
		this.setState({
			layoutType: ''
		})
		history.push('/page1')
	}
	render() {
		return (
			<Layout type={this.state.layoutType}
				onLogin={this.onLogin} />

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
		<Router>
			<Component />
		</Router>,
		document.getElementById('app')
	);
};

render(hot(withRouter(App)));
