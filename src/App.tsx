import ReactDOM from 'react-dom';
import React from 'react';
import {
	BrowserRouter as Router,
	withRouter,
} from "react-router-dom"
import { hot } from 'react-hot-loader/root';
import Layout from './layout'
import './style/app.less'

type Props = {
	history: any,
}
type State = {
	layoutType: string,
}
class App extends React.Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			layoutType: 'layout1'
		}
	}
	onChangeLayout = (layoutType: string) => {
		this.setState({
			layoutType
		})
	}
	onLogin = () => {
		const { history } = this.props;
		sessionStorage.setItem('login', 'true')
		history.push('/page1')
	}
	render() {
		const login = sessionStorage.getItem('login')
		return (
			<Layout type={this.state.layoutType}
				onLogin={this.onLogin}
				login={login} />

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
