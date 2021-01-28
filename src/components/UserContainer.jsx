import React from "react";
import API from "../utils/API";
import UserList from "./UserList";

class UserContainer extends React.Component {
  // initialize state variables
  state = {
    result: [],
    nameClicked: false,
    searchInput: "",
    resultCopy: []
    // phoneClicked: false,
    // emailClicked: false,
    // birthdayClicked: false
  };
  // when component mounts, make api call to populate UI
  componentDidMount() {
    this.searchRandomUser();
  }
  // this function calls the API util and sets the result state to the data results
  searchRandomUser = () => {
    API.search()
      .then(res => {
        this.setState({ result: res.data.results });
        this.setState({ resultCopy: this.state.result });
        // console.log(this.state.result);
        // this.state.result.map(item => console.log(item));
      })
      .catch(err => console.log(err));
  }
  // handle sort
  handleSort = category => {
    const sortedArray = this.state.result;
    sortedArray.sort((a, b) => {
      let x = a.name.first;
      let y = b.name.first;
      if (this.state.nameClicked) {
        return x === y ? 0 : x > y ? 1 : -1;
      } else {
        return x === y ? 0 : x > y ? -1 : 1;
      }
    });
    // set state to new sortedArray
    this.setState({ result: sortedArray });
    // set click state 
    if (this.state.nameClicked) {
      this.setState({ nameClicked: false })
    } else {
      this.setState({ nameClicked: true })
    }
  };
  // handle search input
  handleInputChange = event => {
    // get the value and name of the input that triggered the change
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    let searchInputLower = value.trim().toLowerCase();
    let resultFiltered = [];
    if (searchInputLower === "") {
      resultFiltered.length = 0;
    } else {
      resultFiltered = this.state.result.filter(item => {
        return (item.name.first.toLowerCase().includes(searchInputLower) || item.name.last.toLowerCase().includes(searchInputLower))
      })
    };
    // updating state
    if (this.state.searchInput === "" || resultFiltered.length === 0) {
      this.setState({ result: this.state.resultCopy })
    } else {
      this.setState({ result: resultFiltered })
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
          <div className="input-group">
            <input type="text" name="searchInput" onChange={this.handleInputChange} className="form-control" aria-label="Text input with search button" />
            <button type="button" className="btn btn-outline-secondary">Search</button>
          </div>
          <span />
          <br />
          <p>Your search: {this.state.searchInput}</p>
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