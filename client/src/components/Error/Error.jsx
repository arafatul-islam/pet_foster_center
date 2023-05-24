import React from "react";

const Error = ({ children }) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {children}
      </div>
    </div>
  );
};

export default Error;
