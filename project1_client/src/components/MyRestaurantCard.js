import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";
import CircularProgress from "material-ui/CircularProgress";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    token: state.user.token
  };
};

class MyRestaurantCard extends Component {
  state = {
    restaurants: [],
    loading: true
  };

  componentDidMount() {
    console.log(this.props);
    fetch(
      `https://restaurantportal.herokuapp.com/api/v1/users/${
        this.props.user.sub
      }/restaurants`
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          restaurants: result,
          loading: false
        });
      });
  }

  onHandleClicked = id => {
    this.props.history.push(`/restaurants/${id}`);
  };

  render() {
    if (this.state.loading) {
      return (
        <div style={{ marginTop: "100px" }}>
          <CircularProgress size={60} thickness={7} />
        </div>
      );
    }

    return (
      <div className="container" style={styles.root}>
        <GridList cols={2} cellHeight={400} padding={5} style={styles.gridList}>
          {this.state.restaurants.data.map(restaurant => (
            <GridTile
              key={restaurant.id}
              title={restaurant.attributes.name}
              style={{ cursor: "pointer" }}
              onClick={() => this.onHandleClicked(restaurant.id)}
              subtitle={
                <span>
                  <b>
                    {restaurant.attributes["is-open"]
                      ? "Now Opened"
                      : "Now Closed"}
                  </b>
                </span>
              }
              subtitleStyle={{
                color: restaurant.attributes["is-open"] ? "yellow" : "grey"
              }}
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,0) 100%)"
              cols={restaurant.id % 3 === 0 ? 2 : 1}
              rows={restaurant.id % 3 === 0 ? 2 : 1}
            >
              <img
                src={restaurant.attributes["profile-image"]}
                alt={restaurant.attributes.name}
              />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(MyRestaurantCard);

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "88px"
  },
  gridList: {
    width: 700,
    height: 550,
    overflowY: "auto"
  }
};
