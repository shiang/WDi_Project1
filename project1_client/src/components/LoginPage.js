import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText } from "material-ui/Card";
import AuthForm from "./AuthForm";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";

export default () => {
  //style={{ position: 'fixed', top: 0, zIndex: 10, backgroundColor: '#5C67E1' }}
  return (
    <div
      style={{
        margin: "0 auto",
        //top: 0,
        //bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: (window.innerHeight - 64) / 3
      }}
    >
      <Card>
        <Paper style={{ width: 500 }} zDepth={5} className="container">
          <div>
            <Route
              path="/login"
              render={props => (
                <h2 style={{ marginLeft: 10 }} className="card-heading">
                  Login
                </h2>
              )}
            />

            <Route
              path="/signup"
              render={props => (
                <h2 style={{ marginLeft: 10 }} className="card-heading">
                  Sign Up
                </h2>
              )}
            />

            <Route
              path="/login"
              render={props => (
                <AuthForm submitButtonLabel={"Login"} {...props} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <AuthForm submitButtonLabel={"Sign Up"} {...props} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <CardText>
                  Don't have an account? <Link to={"/signup"}>Create one</Link>.
                </CardText>
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <CardText>
                  Already have an account? <Link to={"/login"}>Login</Link>.
                </CardText>
              )}
            />
          </div>
        </Paper>
      </Card>
    </div>
  );
};
