import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import axios from "axios";
import { client } from "../client";
import IconButton from "material-ui/IconButton";
import Back from "material-ui/svg-icons/content/reply";
import { grey400 } from "material-ui/styles/colors";
import { connect } from "react-redux";
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.user.token
  };
};

const StyledCard = styled(Card)`
  max-width: 960px;
  margin: 0 auto
  padding: 4em;
  margin-top: 100px;
`;

//Validation rules:
const validate = values => {
  const errors = {};
  const requiredFields = ["name", "is_open", "price", "description"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
};

//Render inputs
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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    value={input.value.toString()}
    onChange={(event, index, value) => {
      if (value === "true") {
        input.onChange(Boolean(value));
      }
      if (value === "false") {
        input.onChange(!Boolean(value));
      }
    }}
    children={children}
    {...custom}
  />
);

class RestaurantEditForm extends Component {
  state = {
    name: "",
    address: "",
    phone: "",
    description: "",
    is_open: null
  };

  componentDidMount = async () => {
    await axios
      .get(
        `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        console.log(res);
        this.setState({
          name: res.data.data.attributes.name,
          address: res.data.data.attributes.address,
          phone: res.data.data.attributes.phone,
          description: res.data.data.attributes.description,
          is_open: res.data.data.attributes["is-open"]
        });
      });

    this.handleInitialize();
  };

  handleInitialize = () => {
    console.log(this.state.is_open);
    const initData = {
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      description: this.state.description,
      is_open: this.state.is_open
    };

    this.props.initialize(initData);
  };

  onSubmit = data => {
    const url = `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
      this.props.match.params.id
    }`;

    axios({
      method: "put",
      url,
      data,
      headers: {
        authorization: `Bearer ${this.props.token}`
      }
    });

    this.props.history.goBack();

  };

  deleteRestaurant = () => {
    const url = `https://restaurantportal.herokuapp.com/api/v1/restaurants/${
      this.props.match.params.id
    }`;

    const token = localStorage.getItem("token");
    const request = client(token);

    request.delete(url, {
      "Content-Type": `application/vnd.api+json`
    });

    this.props.history.push("/restaurants");
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, history } = this.props;

    return (
      <StyledCard>
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

        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              name="name"
              component={renderTextField}
              label="Restaurant Name"
            />
          </div>
          <div>
            <Field name="address" component={renderTextField} label="Address" />
          </div>
          <div>
            <Field name="phone" component={renderTextField} label="Phone" />
          </div>
          <div>
            <Field
              name="description"
              component={renderTextField}
              label="About Us"
              multiLine={true}
              rows={2}
            />
          </div>

          <div>
            <Field
              name="is_open"
              component={renderSelectField}
              label="Opened now?"
            >
              <MenuItem value="true" primaryText="Yes" />
              <MenuItem value="false" primaryText="No" />
            </Field>
          </div>
          <div>
            <RaisedButton
              label="Submit"
              primary={true}
              disabled={pristine || submitting}
              style={style}
              type="submit"
            />
            <RaisedButton
              label="Clear"
              secondary={true}
              disabled={pristine || submitting}
              style={style}
              onClick={reset}
            />
            <RaisedButton
              label="Delete"
              secondary={true}
              disabled={submitting}
              style={style}
              onClick={this.deleteRestaurant}
            />
          </div>
        </form>
      </StyledCard>
    );
  }
}

const style = {
  margin: 12
};

RestaurantEditForm = connect(mapStateToProps, null)(RestaurantEditForm)

export default reduxForm({
  form: "editRestaurant", // a unique identifier for this form
  validate
})(RestaurantEditForm);
