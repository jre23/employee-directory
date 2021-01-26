import React from "react";
import API from "../utils/API";
import UserName from "./UserName";
import UserPhoto from "./UserPhoto";

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
				// this.state.result.map(item => console.log(item.picture.large));
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<>
				<div className="row">
					<div className="col-12">
						<h1 className="text-center">Hello from the UserContainer component!</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-2 ml-2">
						<h1 className="test-center">Name</h1>
						<h4>{this.state.result.map(item => <UserName firstName={item.name.first} lastName={item.name.last} />)}</h4>
					</div>
					<div className="col-2 ml-2">
						<h1 className="test-center">Photo</h1>
						{this.state.result.map(item => <UserPhoto pictureUrl={item.picture.large} />)}
					</div>
				</div>
			</>
		);
	}
}

export default UserContainer;