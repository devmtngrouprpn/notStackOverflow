import React from "react";

function LoadingWraper({ text, children, loading }) {
  return <>{loading ? text : children}</>;
}

export default LoadingWraper;
