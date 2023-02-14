import React from "react";
import { Alert } from "react-bootstrap";

const Msg = ({ variant, children }) => {
  return <Alert variant={variant}> {children} </Alert>;
};
Msg.defaultProps = {
  varaint: "info",
};
export default Msg;
