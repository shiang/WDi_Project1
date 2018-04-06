import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import User from "material-ui/svg-icons/social/person";
import Lock from "material-ui/svg-icons/action/lock";
import { grey500 } from "material-ui/styles/colors";
import CircularProgress from "material-ui/CircularProgress";
import axios from "axios";
import Alert from "react-bootstrap/lib/Alert";
import jwtDecoder from "jwt-decode";
import { connect } from "react-redux";
import { saveToken, saveUser } from "../actions/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveUserInfo: user => {
      dispatch(saveUser(user));
    },
    saveTokenInfo: token => {
      dispatch(saveToken(token));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    token: state.user.token
  };
};

const styles = {
  form: {
    marginBottom: 20
  },
  successMessage: {
    backgroundColor: "rgb(251, 161, 97)",
    padding: 10,
    width: 300,
    color: "white",
    margin: "15px auto"
  },
  errorMessage: {
    backgroundColor: "red",
    padding: 10,
    width: 300,
    color: "white",
    margin: "15px auto"
  },
  icons: {
    marginLeft: 10,
    marginRight: 10,
    color: grey500
  }
};

//Validation rules:
const validate = values => {
  const errors = {};
  const requiredFields = ["name", "isAvailable", "price", "description"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderPasswordTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    type="password"
    {...input}
    {...custom}
  />
);

class AuthForm extends Component {
  state = {
    loading: false,
    token: null
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    this.setState({
      token
    });
  };

  login = data => {
    const url = "https://restaurantportal.herokuapp.com/api/v1/user_token";

    axios({
      method: "post",
      url,
      data
    })
      .then(res => {
        if (res.data.jwt !== null) {
          localStorage.setItem("token", res.data.jwt);
          const user = jwtDecoder(res.data.jwt);
          this.props.saveUserInfo(user);
          this.props.saveTokenInfo(res.data.jwt);

          this.setState(prevState => ({
            loading: !prevState.loading
          }));
          this.props.history.push("/restaurants");
        }
      })
      .catch(error => {
        if (error) {
          return (
            <Alert bsStyle="warning">
              <strong>Holy guacamole!</strong> Please check your email or
              password.
            </Alert>
          );
        }
      });
  };

  signUp = async data => {
    console.log(data);
    const url = "https://restaurantportal.herokuapp.com/api/v1/users";

    await axios({
      method: "post",
      url,
      data
    });

    this.setState(prevState => ({
      loading: !prevState.loading
    }));

    this.props.history.push("/login");
  };

  onSubmit = async data => {
    this.setState({
      loading: true
    });

    if (this.props.submitButtonLabel === "Login") {
      const authData = {
        auth: data
      };

      this.login(authData);
    }

    if (this.props.submitButtonLabel === "Sign Up") {
      const signUpData = {
        role_id: 1,
        ...data
      };

      await this.signUp(signUpData);
    }
  };

  render() {
    const {
      handleSubmit,
      successMessage,
      errorMessage,
      submitButtonLabel
    } = this.props;

    const { loading, token } = this.state;

    if (token) {
      return <Redirect to="/restaurants" />;
    }

    if (loading) {
      return (
        <div style={{ marginTop: "100px" }}>
          <CircularProgress size={60} thickness={7} />
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="field-line">
          <User style={styles.icons} />
          <Field name="email" component={renderTextField} label="Email" />
        </div>

        <div className="field-line">
          <Lock style={styles.icons} />
          <Field
            name="password"
            component={renderPasswordTextField}
            label="Password"
          />
        </div>

        {submitButtonLabel === "Sign Up" && (
          <div className="field-line">
            <Lock style={styles.icons} />
            <Field
              name="password_confirmation"
              component={renderPasswordTextField}
              label="Confirm Password"
            />
          </div>
        )}

        <div className="button-line">
          <RaisedButton
            style={{ marginLeft: 10, marginTop: 10 }}
            type="submit"
            label={submitButtonLabel}
            primary
          />
        </div>

        <div>
          {loading && (
            <div style={{ margin: 20 }}>
              <CircularProgress />
            </div>
          )}

          {successMessage && (
            <div style={styles.successMessage}>{successMessage}</div>
          )}

          {errorMessage && (
            <div style={styles.errorMessage}>{errorMessage}</div>
          )}
        </div>
      </form>
    );
  }
}

AuthForm.propTypes = {
  submitButtonLabel: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  email: PropTypes.string
};

AuthForm.defaultProps = {
  successMessage: "",
  errorMessage: "",
  email: ""
};

AuthForm = connect(mapStateToProps, mapDispatchToProps)(AuthForm);

export default reduxForm({
  form: "Login",
  validate
})(AuthForm);
