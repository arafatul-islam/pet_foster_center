import React from "react";

const Success = ({ children }) => {
  return (
    <div>
      <div className="alert alert-success" role="alert">
        {children}
      </div>
    </div>
  );
};

export default Success;
