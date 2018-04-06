import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { deepPurpleA100 } from "material-ui/styles/colors";
import Profile from "material-ui/svg-icons/action/account-circle";
import Feedback from "material-ui/svg-icons/action/feedback";
import Help from "material-ui/svg-icons/action/help";
import RestaurantIcon from "material-ui/svg-icons/maps/restaurant";
import Divider from "material-ui/Divider";
import HomeIcon from "material-ui/svg-icons/action/home";
import Exit from "material-ui/svg-icons/action/exit-to-app";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    token: state.user.token
  };
};

class SideMenu extends Component {
  state = {
    token: null
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    this.setState({
      token
    });
  };
  render() {
    const { routeProps } = this.props;

    return (
      <div style={{ marginTop: 20 }}>
        <Menu
          onItemClick={() => this.props.onHandleClose()}
          selectedMenuItemStyle={{ backgroundColor: deepPurpleA100 }}
        >
          <MenuItem
            primaryText="Home"
            leftIcon={<HomeIcon />}
            onClick={() => {
              const path = {
                pathname: "/"
              };
              routeProps.history.push(path);
            }}
          />

          <MenuItem
            primaryText="Restaurants"
            leftIcon={<RestaurantIcon />}
            onClick={() => {
              const path = {
                pathname: "/restaurants"
              };
              routeProps.history.push(path);
            }}
          />

          {this.props.token !== null && (
            <MenuItem
              primaryText="My restaurants"
              leftIcon={<RestaurantIcon />}
              onClick={() => {
                routeProps.history.push(`/users/${this.props.user.sub}/restaurants`);
              }}
            />
          )}

          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Link to="/profile">
            <MenuItem primaryText="Profile" leftIcon={<Profile />} />
          </Link>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <MenuItem primaryText="Send feedback" leftIcon={<Feedback />} />
          <MenuItem primaryText="Help" leftIcon={<Help />} />
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          {this.state.token !== null && (
            <MenuItem
              primaryText="Sign Out"
              leftIcon={<Exit />}
              onClick={() => {
                localStorage.removeItem("token");
                const path = {
                  pathname: "/login"
                };
                routeProps.history.push(path);
              }}
            />
          )}
        </Menu>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(SideMenu);
