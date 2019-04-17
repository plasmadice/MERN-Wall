import React from "react";
// TODO - add proptypes

const Header = props => {
  // conditional rendering on header
  return (
    <div className="site-greeting">
      {(props.user === null && <p>Hello guest, sign up to post</p>) ||
        (props.user.local.username && (
          <p>
            Welcome back, <strong>{props.user.local.username} </strong>
          </p>
        ))}
    </div>
  );
};

export default Header;
