import React from "react";

<<<<<<< HEAD
function LoadingWraper({ children, loading, text }) {
  return <>{loading ? text : children}</>;
=======
function LoadingWraper({ text, children, loading }) {
    return (
        <>
            {loading
                ? text
                : children
            }
        </>
    )
>>>>>>> master
}

export default LoadingWraper;
