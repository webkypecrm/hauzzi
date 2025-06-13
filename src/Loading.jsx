import React, { Fragment } from "react";
import { ClipLoader } from "react-spinners";


const Loading = () => {
  return (
    <Fragment>
        <div className="d-flex justify-content-center">
            <ClipLoader color="#ffbd59" size={45} />

        </div>
      
    </Fragment>
    
  );
};

export default Loading;
