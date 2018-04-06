import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";
import { fetchedItem } from "../actions/menu";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gotItem: data => {
      dispatch(fetchedItem(data));
    }
  };
};

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto"
  },
  titleStyle: {
    color: "rgb(0, 188, 212)"
  }
};

class ItemList extends Component {
  render() {
    const { menuData, routeProps } = this.props;

    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          {menuData.map(item => (
            <GridTile
              key={item.id}
              title={item.attributes.name}
              onClick={ async () => {
                await this.props.gotItem(item);
                const path = {
                  pathname: `${item.relationships.menu.data.id}/menu_items/${
                    item.id
                  }`
                };
                routeProps.history.push(path);
              }}
              titleStyle={styles.titleStyle}
              style={{ cursor: "pointer" }}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img
                src={item.attributes["item-image"]}
                alt={item.attributes.name}
              />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ItemList);
