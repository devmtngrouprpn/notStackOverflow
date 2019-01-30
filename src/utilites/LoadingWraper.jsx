import React from "react";

function LoadingWraper({ children, loading, text }) {
  return <>{loading ? text : children}</>;
}

export default LoadingWraper;
