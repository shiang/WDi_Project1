import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import { client } from "../client";

const StyledCard = styled(Card)`
  max-width: 960px;
  margin: 0 auto;
  padding: 4em;
  margin-top: 100px;
`;

//Validation rules:
const validate = values => {
  const errors = {};
  const requiredFields = ["name", "address", "phone", "description"];
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
    value={input.value}
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

class CreateRestaurant extends Component {
  onSubmit = async data => {
    const token = localStorage.getItem("token");
    console.log(token);
    const request = client(token);
    const url = `https://restaurantportal.herokuapp.com/api/v1/restaurants/`;
    await request.post(url, data);
    this.props.history.push("/restaurants");
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    console.log(this.props);

    return (
      <StyledCard>
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
              name="profile_image"
              component={renderTextField}
              label="Photo (link)"
            />
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
          </div>
        </form>
      </StyledCard>
    );
  }
}

const style = {
  margin: 12
};

export default reduxForm({
  form: "createRestaurant", // a unique identifier for this form
  validate
})(CreateRestaurant);
