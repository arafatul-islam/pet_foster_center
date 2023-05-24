import React, { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading" style={{ marginTop: " 25% " }}>
      <RingLoader
        color="#000"
        loading={loading}
        size={90}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Loader;
