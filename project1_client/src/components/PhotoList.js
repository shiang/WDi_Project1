import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";

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
    color: "white"
  }
};

class PhotoList extends Component {
  render() {
    const { url } = this.props;

    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={1} cellHeight={400}>
          <GridTile
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img alt={url} src={url} />
          </GridTile>
        </GridList>
      </div>
    );
  }
}

export default PhotoList;
