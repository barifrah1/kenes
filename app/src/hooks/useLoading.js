import React, { useState } from "react";
import ReactLoading from "react-loading";
const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const Loading = () => {
    return (
      <>
        {loading && (
          <ReactLoading
            type={"spin"}
            color={"#ee8425"}
            height={"30%"}
            width={"30%"}
          />
        )}
        ;
      </>
    );
  };

  return { Loading, setLoading };
};

export default useLoading;
