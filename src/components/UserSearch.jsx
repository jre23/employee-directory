import React from "react";
// this UserSearch component handles the search input and reset list functionality
const UserSearch = props => {
  return (
    <>
      <div className="input-group col-4" style={{ margin: "0 auto" }}>
        <input id="search-input" type="text" placeholder="Search" name="searchInput" onChange={props.handleInputChange} className="form-control" aria-label="Text input" />
      </div>
      <br />
      <button type="button" className="btn btn-outline-info justify-content-center col-.5 d-flex mx-auto" onClick={props.resetList}>Reset List</button>
    </>
  )
};

export default UserSearch;