import React, {Component} from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
// import {robots} from './robots'

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: '',
		};
		console.log(1);
	}

	componentDidMount() {
		console.log(2);
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => (res.json()))
			.then((users) => (this.setState({robots: users})));
	}

	onSearchChange = (event) => {
		console.log(event.target.value);
		this.setState({searchfield: event.target.value});
	}

	render() {
		console.log(3);
		// const filteredRobots = this.state.robots.filter((robot) => {
		// 	return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		// });
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		if (!robots.length) {
			return (<h2 className='tc'>Loading</h2>);
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RobotFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
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

export default App;