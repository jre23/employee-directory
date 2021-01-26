import React from "react";

function UserName(props) {
  let birthdayDate = new Date(props.dob.date).toLocaleDateString("en-US");
  // console.log("=====props=====");
  // console.log(props);
  return (
    <>
      <div className="row ml-1">
        <div className="col">
          {props.name.first} {props.name.last}
        </div>
        <div className="col">
          <img src={props.picture.large} alt={`random user ${props.name.first}`}></img>
        </div>
        <div className="col">
          {props.cell}
        </div>
        <div className="col">
          {props.email}
        </div>
        <div className="col">
          {birthdayDate}
        </div>
      </div>
    </>
  );
}

export default UserName;