import React from "react";
import API from "../utils/API";
import UserList from "./UserList";

class UserContainer extends React.Component {
	// initialize state variables
	state = {
		result: {},
	};

	componentDidMount() {
		this.searchRandomUser();
	}

	searchRandomUser = () => {
		API.search()
			.then(res => {
				console.log("======API res======");
				// console.log(res.data);
				console.log(res.data.results);
				console.log(this.state.result);
				// console.log(res.data.results[0]);
				this.setState({ result: res.data.results })
				console.log(this.state.result);
				console.log(this.state.result[0].name.first);
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="text-center">
				<h1>Hello from the UserContainer component!</h1>
				<h3><UserList name={"Joel"} /></h3>
				<h3><UserList name={"Estrada"} /></h3>
			</div>
		);
	}
}

export default UserContainer;