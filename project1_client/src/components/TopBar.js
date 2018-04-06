import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import { grey200 } from "material-ui/styles/colors";
import { toggleSideBar } from "../actions/sidebar";
import IconButton from "material-ui/IconButton";
import SideMenu from "./SideMenu";
import Nav from "material-ui/svg-icons/action/reorder";
import { connect } from "react-redux";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { Link } from "react-router-dom";

class Login extends Component {
  static muiName = "FlatButton";

  render() {
    return (
      <Link to="/login">
        <FlatButton {...this.props} label="Login" />
      </Link>
    );
  }
}

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    targetOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
  >
    <Link to="/restaurants/new">
      <MenuItem primaryText="Create Restaurant" />
    </Link>
    <MenuItem primaryText="Help" />
  </IconMenu>
);

class TopBar extends Component {
  state = {
    token: null
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    this.setState({
      token
    });
  };

  handleToggle = () => {
    this.props.onToggleSideBar(!this.props.sidebar);
  };
  render() {
    return (
      <React.Fragment>
        <AppBar
          style={{
            position: "fixed",
            top: 0,
            zIndex: 10,
            backgroundColor: "#5C67E1"
          }}
          iconElementLeft={
            <IconButton onClick={this.handleToggle}>
              <Nav />
            </IconButton>
          }
          title="Restaurant Management Portal"
          onTitleClick={() => {
            this.props.history.push("/restaurants");
          }}
          titleStyle={{ cursor: "pointer" }}
          iconElementRight={this.state.token !== null ? <Logged /> : <Login />}
        />

        <Drawer
          containerStyle={{ marginTop: 64, backgroundColor: grey200 }}
          docked={true}
          open={this.props.sidebar}
          onRequestChange={isOpened => this.props.onToggleSideBar({ isOpened })}
        >
          <SideMenu onHandleClose={this.handleToggle} routeProps={this.props} />
        </Drawer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sidebar: state.sidebar.isOpened
});

const mapDispatchToProps = dispatch => ({
  onToggleSideBar(isOpened) {
    dispatch(toggleSideBar(isOpened));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
