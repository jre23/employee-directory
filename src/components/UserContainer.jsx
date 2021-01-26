import React from "react";
import API from "../utils/API";
import UserList from "./UserList";

class UserContainer extends React.Component {
  // initialize state variables
  state = {
    result: [],
    clicked: false
  };
  // when component mounts, make api call to populate UI
  componentDidMount() {
    this.searchRandomUser();
  }
  // this function calls the API util and sets the result state to the data results
  searchRandomUser = () => {
    API.search()
      .then(res => {
        this.setState({ result: res.data.results })
        console.log(this.state.result);
        // // this.state.result.map(item => console.log(item));
      })
      .catch(err => console.log(err));
  }
  // handle sort
  handleSort = () => {
    const sortedArray = this.state.result;
    sortedArray.sort((a, b) => {
      let x = a.name.first;
      let y = b.name.first;

      if (this.state.clicked) {
        return x === y ? 0 : x > y ? 1 : -1;
      } else {
        return x === y ? 0 : x > y ? -1 : 1;
      }
    });
    // set state to new sortedArray
    this.setState({ result: sortedArray });
    // set click state 
    if (this.state.clicked) {
      this.setState({ clicked: false })
    } else {
      this.setState({ clicked: true })
    }
  };
  // render UI
  render() {
    return (
      <>
        <div className="main">
          <div className="row border border-dark">
            <div className="col-12">
              <h1 className="text-center">Random Employee Directory</h1>
            </div>
          </div>
          <br />
          <div className="row text-center">
            <div className="col">
              <h3 className="text-center">Photo</h3>
            </div>
            <div className="col">
              <span onClick={this.handleSort}><h3 className="text-center">Name</h3></span>
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
              {this.state.result.map(item => <UserList key={item.login.uuid} {...item} />)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserContainer;