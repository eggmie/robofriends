import React, {Component} from 'react'
import { connect } from 'react-redux'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'

import { setSearchField } from '../actions'

const mapStateToProps = (state) => {
	return {
		searchField: state.searchField,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	};
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			// searchfield: '',
		};
		console.log(1);
	}

	componentDidMount() {
		console.log(2);
		// console.log(this.props.store.getState());
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => (res.json()))
			.then((users) => (this.setState({robots: users})));
	}

	// onSearchChange = (event) => {
	// 	console.log(event.target.value);
	// 	this.setState({searchfield: event.target.value});
	// }

	render() {
		console.log(3);
		// const filteredRobots = this.state.robots.filter((robot) => {
		// 	return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		// });
		const {robots} = this.state;
		const {searchField, onSearchChange} = this.props;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});
		if (!robots.length) {
			return (<h2 className='tc'>Loading</h2>);
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RobotFriends</h1>
					<SearchBox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
			);			
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);