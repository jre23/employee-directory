import React from "react";
import API from "../utils/API";
import UserList from "./UserList";

class UserContainer extends React.Component {
	// initialize state variables
	state = {
		result: [],
	};

	componentDidMount() {
		this.searchRandomUser();
	}

	searchRandomUser = () => {
		API.search()
			.then(res => {
				this.setState({ result: res.data.results })
				console.log(this.state.result);
				this.state.result.map(item => console.log(item.name.first));
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="text-center">
				<h1>Hello from the UserContainer component!</h1>
				<h4>{this.state.result.map(item => <UserList name={item.name.first} />)} </h4>
			</div>
		);
	}
}

export default UserContainer;