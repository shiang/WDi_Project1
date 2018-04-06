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
import Divider from "material-ui/Divider";
import { connect } from "react-redux";
import { fetchedItem } from "../actions/menu";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gotItem: data => {
      dispatch(fetchedItem(data));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.menu.item,
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
    tooltip="Add/remove specialty to menus"
    tooltipPosition="bottom-left"
    onClick={e => {
      e.stopPropagation();
    }}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Item extends React.Component {
  state = {
    loading: true,
    item: {},
    isAvail: null,
    token: null
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    this.setState({
      token
    });
    const { match } = this.props;

    const url = `https://restaurantportal.herokuapp.com/api/v1/menu_items/${
      match.params.id
    }`;

    await axios.get(url).then(res => {
      this.setState({
        item: res.data.data,
        isAvail: res.data.data.attributes["is-avail"]
      });
    });

    this.setState(prevState => {
      return {
        loading: !prevState.loading
      };
    });
  };

  render() {
    const { loading, item, isAvail } = this.state;
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
        <div style={styles.headerButton}>
          <CardHeader
            title={item.attributes.name}
            subtitle={isAvail ? "Available" : "Sold Out!"}
            avatar={item.attributes["profile-image"]}
          >
            {this.props.token && (
              <Toggle
                toggled={isAvail ? true : false}
                onToggle={
                  //API call to update menu status

                  async () => {
                    const url = `https://restaurantportal.herokuapp.com/api/v1/menu_items/${
                      match.params.id
                    }`;

                    const updatedData = await axios({
                      method: "put",
                      url: url,
                      data: {
                        is_avail: !item.attributes["is-avail"]
                      },
                      headers: {
                        Authorization: `Bearer ${this.state.token}`
                      }
                    });

                    this.props.gotItem(updatedData);

                    this.setState(prevState => {
                      return {
                        isAvail: !prevState.isAvail
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
          <PhotoList url={item.attributes["item-image"]} />
        </CardMedia>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Description" />
        <CardText>
          <h4>{item.attributes.description}</h4>
        </CardText>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardTitle title="Price" />
        <CardText>
          <h4>{item.attributes.price}</h4>
        </CardText>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
