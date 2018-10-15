import React, { Component } from "react";
import Clients from "../clients/Clients";
import SideBar from "./SideBar";

class DashBoard extends Component {
  state = {};

  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-1.5">
          <SideBar />
        </div>
      </div>
    );
  }
}

export default DashBoard;
