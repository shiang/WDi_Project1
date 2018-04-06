import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.menu.menu,
    isFetch: state.menu.isFetch
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

class MenuList extends Component {
  render() {
    const { menuData, routeProps } = this.props;

    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          {menuData.map(menu => (
            <GridTile
              key={menu.id}
              title={menu.attributes.name}
              subtitle={`$${menu.attributes.price}`}
              onClick={async () => {
                const path = {
                  pathname: `/restaurants/${
                    menu.relationships.restaurant.data.id
                  }/menus/${menu.id}`
                };
                routeProps.history.push(path);
              }}
              titleStyle={styles.titleStyle}
              style={{ cursor: "pointer" }}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img
                src={menu.attributes["menu-image"]}
                alt={menu.attributes.name}
              />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(MenuList);
