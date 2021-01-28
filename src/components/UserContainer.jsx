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
    API.search()
      .then(res => {
        this.setState({ result: res.data.results });
        this.setState({ resultOriginal: this.state.result });
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
    this.handleSearch(event);
  };
  // handle search filter
  handleSearch = event => {
    // get the value and name of the input that triggered the change
    console.log(this.state.searchInput);
    let value = event.target.value;
    let searchInputLower = value.trim().toLowerCase();
    let resultFiltered = [];
    if (searchInputLower === "") {
      resultFiltered.length = 0;
    } else {
      resultFiltered = this.state.result.filter(item => {
        return (item.name.first.toLowerCase().includes(searchInputLower) || item.name.last.toLowerCase().includes(searchInputLower) || item.cell.includes(searchInputLower))
      })
    };
    // updating state
    if (this.state.searchInput === "" || resultFiltered.length === 0) {
      this.setState({ result: this.state.resultOriginal })
    } else {
      this.setState({ result: resultFiltered })
    }
  };

  twoFunctionCalls = event => {
    this.handleInputChange(event);
    this.handleSearch(event);
  }

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
            searchInput={this.state.searchInput}
          />
          <br />
          <UserCategories handleSort={this.handleSort} />
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