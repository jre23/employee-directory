import React from "react";
import API from "../utils/API";
import UserList from "./UserList";
import UserSearch from "./UserSearch";
import UserCategories from "./UserCategories";

class UserContainer extends React.Component {
  // initialize state variables
  state = {
    result: [],
    nameClicked: false,
    searchInput: "",
    resultOriginal: []
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
    console.log("=====searchRandomUser=====");
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
  handleSort = category => {
    console.log("=====handleSort=====");
    let sortedArray = this.state.result.slice().sort((a, b) => {
      let x = a.name.first;
      let y = b.name.first;
      if (this.state.nameClicked) {
        return x === y ? 0 : x > y ? 1 : -1;
      } else {
        return x === y ? 0 : x > y ? -1 : 1;
      }
    });
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
    console.log("====handleInputChange====");
    // get the value and name of the input that triggered the change
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    // trim and make search input lower case
    let searchInputLower = value.trim().toLowerCase();
    let resultFiltered = [];
    // search input value is empty, set results array to empty
    if (searchInputLower === "") {
      resultFiltered.length = 0;
    } else {
      // else filter through the state result for any matches
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

  resetList = () => {
    console.log("=====resetList=====");
    this.setState({
      result: this.state.resultOriginal,
      nameClicked: false,
      searchInput: ""
    })
    document.getElementById("search-input").value = "";
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
          <UserSearch
            handleInputChange={this.handleInputChange}
            resetList={this.resetList}
          />
          <br />
          <UserCategories handleSort={this.handleSort} />
          {this.state.result.map(item => <UserList key={item.login.uuid} {...item} />)}
        </div>
      </>
    );
  }
}

export default UserContainer;