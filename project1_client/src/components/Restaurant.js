import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

import CircularProgress from "material-ui/CircularProgress";
//import AddPhotos from "./AddPhotos";
import IconMenu from "material-ui/IconMenu";
import Toggle from "material-ui/Toggle";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import { grey400, red500 } from "material-ui/styles/colors";
import AddPhoto from "material-ui/svg-icons/editor/insert-photo";
import Edit from "material-ui/svg-icons/editor/mode-edit";
import Delete from "material-ui/svg-icons/action/delete";
import Back from "material-ui/svg-icons/content/reply";
import { styles } from "../styles/menuStyles";
import axios from "axios";
import PhotoList from "./PhotoList";
import MenuList from "./MenuList";
import Divider from "material-ui/Divider";
import Alert from "react-bootstrap/lib/Alert";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.user.token
  };
};

const iconButtonElement = (
  <IconButton touch={true} tooltip="Add photos" tooltipPosition="bottom-left">
    <AddPhoto color={grey400} />
  </IconButton>
);

const iconButtonForVertMenu = (
  <IconButton
    touch={true}
    tooltip="Add menu to this restaurant"
    tooltipPosition="bottom-left"
    onClick={e => {
      e.stopPropagation();
    }}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Restaurant extends React.Component {
  state = {
    loading: true,
    restaurant: {},
    menus: [],
    isOpen: null,
    token: null,
    error: false,
    errorMessage: ""
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    this.setState({
      token
    });
    const { match } = this.props;

    const url = `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
      match.params.id
    }`;
    const menusUrl = `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
      match.params.id
    }/menus`;

    await axios.get(url).then(res => {
      this.setState({
        restaurant: res.data.data,
        isOpen: res.data.data.attributes["is-open"]
      });
    });

    await axios.get(menusUrl).then(menus => {
      this.setState({
        menus: menus.data.data
      });
    });

    this.setState(prevState => {
      return {
        loading: !prevState.loading
      };
    });
  };

  render() {
    const { loading, restaurant, isOpen } = this.state;
    const { history, location, match } = this.props;

    if (loading) {
      return (
        <div
          style={{
            marginTop: "100px"
          }}
        >
          <CircularProgress size={60} thickness={7} />
        </div>
      );
    }

    return (
      <Card className="container" style={{ marginTop: "64px" }}>
        {this.state.error && (
          <Alert bsStyle="warning">
            <strong>Holy guacamole!</strong> {this.state.errorMessage}
          </Alert>
        )}

        <div style={styles.headerButton}>
          <CardHeader
            title={restaurant.attributes.name}
            subtitle={isOpen ? "Now Open" : "Closed"}
            avatar={restaurant.attributes["profile-image"]}
          >
            {this.props.token && (
              <Toggle
                toggled={isOpen ? true : false}
                onToggle={
                  //API call to update menu status

                  async () => {
                    const url = `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
                      match.params.id
                    }`;

                    await axios({
                      method: "put",
                      url: url,
                      data: {
                        is_open: !restaurant.attributes["is-open"]
                      },
                      headers: {
                        Authorization: `Bearer ${this.state.token}`
                      }
                    });

                    this.setState(prevState => {
                      return {
                        isOpen: !prevState.isOpen
                      };
                    });
                  }
                }
                labelPosition="right"
                label="This toggle the availability of this item."
                style={{ margin: 10 }}
              />
            )}
          </CardHeader>

          {this.props.token && (
            <div style={styles.iconMenu}>
              <IconButton
                touch={true}
                tooltip="Go Back"
                tooltipPosition="bottom-left"
              >
                <Back
                  color={grey400}
                  onClick={() => {
                    const path = {
                      pathname: "/restaurants"
                    };
                    history.push(path);
                  }}
                />
              </IconButton>

              <IconMenu
                style={{ marginLeft: 20 }}
                iconButtonElement={iconButtonElement}
              />

              <IconMenu
                style={{ marginLeft: 20 }}
                iconButtonElement={iconButtonForVertMenu}
              >
                <Subheader>Choose an action</Subheader>

                <MenuItem
                  primaryText="Add Menu"
                  leftIcon={<Edit />}
                  onClick={() => {
                    const path = {
                      pathname: `${location.pathname}/menus/new`
                    };
                    history.push(path);
                  }}
                />

                <MenuItem
                  primaryText="Edit"
                  leftIcon={<Edit />}
                  onClick={() => {
                    const path = {
                      pathname: `${location.pathname}/edit`
                    };
                    history.push(path);
                  }}
                />

                <MenuItem
                  primaryText="Delete"
                  leftIcon={<Delete color={red500} />}
                  style={{ color: red500 }}
                  onClick={async () => {
                    const token = localStorage.getItem("token");
                    console.log(token);
                    try {
                      await axios({
                        method: "delete",
                        url: `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
                          match.params.id
                        }`,
                        headers: {
                          authorization: `Bearer ${token}`
                        }
                      });
                      history.push("/restaurants");
                    } catch (e) {
                      if (e) {
                        this.setState({
                          error: true,
                          errorMessage: e.message
                        });
                      }
                    }
                  }}
                />
              </IconMenu>
            </div>
          )}
        </div>

        <CardMedia style={{ margin: 20 }}>
          <PhotoList url={restaurant.attributes["profile-image"]} />
        </CardMedia>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Description" />
        <CardText>
          <h4>{restaurant.attributes.description}</h4>
        </CardText>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Menus" />
        <MenuList menuData={this.state.menus} routeProps={this.props} />
      </Card>
    );
  }
}

export default connect(mapStateToProps, null)(Restaurant);
