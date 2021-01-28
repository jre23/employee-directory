import React from "react";

const UserSearch = props => {
  return (
    <>
      <div className="input-group col-6" style={{ margin: "0 auto" }}>
        <input type="text" name="searchInput" onChange={props.handleInputChange} className="form-control" aria-label="Text input with search button" />
        <button type="button" className="btn btn-outline-secondary">Search</button>
      </div>
      <br />
      <h4 className="col-6 text-center" style={{ margin: "0 auto" }}>Search Input: {props.searchInput}</h4>
    </>
  )
};

export default UserSearch;