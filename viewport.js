"use strict";
const Viewport = (props) => {
  Viewport.defaultProps = {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      maxHeight: "100vh",
      maxWidth: "100vw",
      backgroundColor: "#333",
    },
  };

  return (
    <div className="viewport" style={props.style}>
      {props.children}
    </div>
  );
};

