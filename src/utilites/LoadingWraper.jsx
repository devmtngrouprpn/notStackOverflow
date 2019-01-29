import React from 'react';

function LoadingWraper({ children, loading }) {
    return (
        <>
            {loading
                ? "Loading"
                : children
            }
        </>
    )
}

export default LoadingWraper;