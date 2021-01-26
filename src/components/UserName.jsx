import React from "react";

function UserName(props) {

  return (
    <>
      <p>{props.firstName} {props.lastName}</p>
    </>
  );
}

export default UserName;