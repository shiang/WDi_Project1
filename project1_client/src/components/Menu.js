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
import ItemList from "./ItemList";
import Divider from "material-ui/Divider";
import { connect } from "react-redux";
import { fetchedMenu, fetchedItem } from "../actions/menu";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gotMenu: data => {
      dispatch(fetchedMenu(data));
    },
    gotItem: data => {
      dispatch(fetchedItem(data));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.menu.menu,
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
    tooltip="Add item to this menu"
    tooltipPosition="bottom-left"
    onClick={e => {
      e.stopPropagation();
    }}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Menu extends React.Component {
  state = {
    items: [],
    isAvail: null,
    token: null,
    loading: true
  };

  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    this.setState({
      token
    });

    const { match } = this.props;

    const menuUrl = `https://restaurantportal.herokuapp.com/api/v1/menus/${
      match.params.id
    }`;

    const itemsUrl = `https://restaurantportal.herokuapp.com/api/v1/menu_items?menu_id=${
      match.params.id
    }`;

    await axios.get(menuUrl).then(res => {
      this.props.gotMenu(res.data.data);
    });

    await axios.get(itemsUrl).then(res => {
      this.setState({
        items: res.data.data
      });
    });

    this.setState({
      loading: false,
      isAvail: this.props.menu.attributes["is-avail"]
    });
  };

  render() {
    const { items, loading, isAvail } = this.state;
    const { history, location, match, menu } = this.props;

    if (loading) {
      return (
        <div>
          <CircularProgress size={60} thickness={7} />
        </div>
      );
    }

    return (
      <Card className="container" style={{ marginTop: 64 }}>
        <div style={styles.headerButton}>
          <CardHeader
            title={menu.attributes.name}
            subtitle={isAvail ? "Available" : "Sold out!"}
            avatar={menu.attributes["menu-image"]}
          >
            {this.props.token && (
              <Toggle
                toggled={isAvail}
                onToggle={async () => {
                  const url = `https://restaurantportal.herokuapp.com/api/v1/menus/${
                    match.params.id
                  }`;

                  const updatedData = await axios({
                    method: "put",
                    url: url,
                    data: {
                      is_avail: !this.props.menu.attributes["is-avail"]
                    },
                    headers: {
                      Authorization: `Bearer ${this.state.token}`
                    }
                  });

                  this.props.gotMenu(updatedData.data.data);

                  this.setState(prevState => {
                    return {
                      isAvail: !prevState.isAvail
                    };
                  });
                }}
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
                    history.goBack();
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
                  primaryText="Add Item"
                  leftIcon={<Edit />}
                  onClick={() => {
                    const path = {
                      pathname: `${location.pathname}/menu_items/new`
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
                  onClick={() => {}}
                />
              </IconMenu>
            </div>
          )}
        </div>
        <CardMedia style={{ margin: 20 }}>
          <PhotoList url={menu.attributes["menu-image"]} />
        </CardMedia>

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Description" />
        <CardText>
          <h4>{menu.attributes.description}</h4>
        </CardText>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Price" />
        <CardText>
          <h4>{menu.attributes.price}</h4>
        </CardText>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Items" />
        <ItemList menuData={items} routeProps={this.props} />
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
