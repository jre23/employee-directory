import React from "react";
import API from "../utils/API";
import UserList from "./UserList";
import UserSearch from "./UserSearch";
import UserCategories from "./UserCategories";

class UserContainer extends React.Component {
  // initialize state variables
  state = {
    result: [],
    name: false,
    phone: false,
    email: false,
    birthday: false,
    searchInput: "",
    resultOriginal: []
  };
  // when component mounts, make api call to populate UI
  componentDidMount() {
    this.searchRandomUser();
  }
  // this function calls the API util and sets the result state to the data results
  searchRandomUser = () => {
    API()
      .then(res => {
        this.setState({
          result: res.data.results,
          resultOriginal: res.data.results
        });
      })
      .catch(err => console.log(err));
  }
  // handle sort
  handleSort = event => {
    let keyName = event.target.getAttribute("value");
    let sortedArray = this.state.result.slice().sort((a, b) => {
      let x = "";
      let y = "";
      switch (keyName) {
        case "name":
          x = a.name.first;
          y = b.name.first;
          break;
        case "phone":
          x = a.cell;
          y = b.cell;
          break;
        case "email":
          x = a.email;
          y = b.email;
          break;
        case "birthday":
          x = a.dob.age;
          y = b.dob.age;
          break;
        default:
          x = a;
          y = b;
      }
      if (this.state[keyName]) {
        return x === y ? 0 : x > y ? -1 : 1;
      } else {
        return x === y ? 0 : x > y ? 1 : -1;
      }
    });
    this.setState({ result: sortedArray });
    // set click state 
    if (this.state[keyName]) {
      this.setState({ [keyName]: false })
    } else {
      this.setState({ [keyName]: true })
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
    // trim and make search input lower case
    let searchInputLower = value.trim().toLowerCase();
    let resultFiltered = [];
    // if search input value is empty, set results array to empty
    if (searchInputLower === "") {
      resultFiltered.length = 0;
    } else {
      // else filter through the state.result for any matches
      resultFiltered = this.state.result.filter(item => {
        return (item.name.first.toLowerCase().includes(searchInputLower) || item.name.last.toLowerCase().includes(searchInputLower) || item.cell.includes(searchInputLower))
      })
    };
    // update state. if no results set state to original list, else set it to results list
    if (searchInputLower === "" || resultFiltered.length === 0) {
      this.setState({ result: this.state.resultOriginal })
    } else {
      this.setState({ result: resultFiltered })
    }
  };
  // button click handler to reset the list to the original list after the user has sorted the list or searched for a person in the list
  resetList = () => {
    this.setState({
      result: this.state.resultOriginal,
      name: false,
      phone: false,
      email: false,
      birthday: false,
      searchInput: ""
    })
    document.getElementById("search-input").value = "";
  };

  // render UI
  render() {
    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-12 border border-dark">
              <h1 className="text-center" style={{ color: "#C7493A" }}>Random Employee Directory</h1>
            </div>
            <div className="col-md-10 col-12 text-center d-flex mx-auto pt-2">
              <p className="">Welcome to the Random Employee Directory! This random list of employees was generated from the Random User API. This app allows sorting through the list by each category except photo (click on the column titles to sort in both directions!). This app also allows for searching the list by name or phone number! Click the Reset List button to return the list to its original form when the page was loaded!
              <br />
                <strong>NOTE:</strong> Known bug: "Access to XMLHttpRequest at 'https://randomuser.me/api/?results=15' from origin 'https://jre23.github.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource." <strong>WORKAROUND:</strong> Refresh the page until a list of random users shows up.</p>
            </div>
          </div>
          <UserSearch
            handleInputChange={this.handleInputChange}
            resetList={this.resetList}
          />
          <br />
          <UserCategories handleSort={this.handleSort}
          />
          <br />
          {this.state.result.map(item => <UserList key={item.login.uuid} {...item}
          />)}
        </div>
      </>
    );
  }
}

export default UserContainer;