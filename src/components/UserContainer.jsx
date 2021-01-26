import React from "react";
import API from "../utils/API";
import UserName from "./UserName";

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
				// // this.state.result.map(item => console.log(item));
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<>
				<div className="main">
					<div className="row border-bottom-2">
						<div className="col-12">
							<h1 className="text-center">Random Employee Directory</h1>
						</div>
					</div>
					<br />
					<div className="row text-center">
						<div className="col">
							<h3 className="text-center">Name</h3>
						</div>
						<div className="col">
							<h3 className="text-center">Photo</h3>
						</div>
						<div className="col">
							<h3 className="text-center">Phone Number</h3>
						</div>
						<div className="col">
							<h3 className="text-center">Email</h3>
						</div>
						<div className="col">
							<h3 className="text-center">Birthday</h3>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-12">
							{this.state.result.map(item => <UserName key={item.login.uuid} {...item} />)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default UserContainer;