import React, { Component } from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";

class App extends Component {
  render() {
    return (
      <div
        style={{
          margin: "0 auto"
        }}
      >
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">DeliverFoo</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/login">
                Owner Login
              </NavItem>
              <NavItem eventKey={2} href="/restaurants">
                Restaurants
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <img
          src="https://c.pxhere.com/photos/6f/79/abendbrot_restaurant_salad_eat_italians_berlin_kurf_rstendamm-1066618.jpg!d"
          alt="restaurant"
          style={{
            flex: "1",
            display: "flex",
            margin: "0 auto",
            width: "100%"
          }}
        />
      </div>
    );
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
