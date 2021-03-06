import React from "react";
import Spinner from "react-spinkit";

const PageSpinner = (props) => {
  return (
    <>
      {props.isLoading && (
        <div
          className="d-flex justify-content-center text-center position-absolute"
          style={{ width: "100%", height: 400, zIndex: 5 }}
        >
          <div style={{ paddingTop: "20%", position: "absolute" }}>
            <div
              className="spinner card p-3 rounded-circle"
              style={{ backgroundColor: "#fff" }}
            >
              <Spinner name="ball-scale-ripple" color="#000" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { PageSpinner };
