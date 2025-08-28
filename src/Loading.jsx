import React, { Fragment } from "react";
import { ClipLoader } from "react-spinners";


const Loading = ({style}) => {
  return (
    <Fragment>
        <div className="d-flex justify-content-center" style={style}>
            <ClipLoader color="#ffbd59" size={45} />

        </div>
      
    </Fragment>
    
  );
};

export default Loading;
