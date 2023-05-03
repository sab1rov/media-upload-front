import React from "react";
import { Spin } from "antd";

function FullPageLoader(props) {
  return (
    <div
      className="fp-container"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        backgroundColor: "#03c8ff48",
        zIndex: "1500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default FullPageLoader;
