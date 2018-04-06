import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import Alert from "react-bootstrap/lib/Alert";
import IconButton from "material-ui/IconButton";
import Back from "material-ui/svg-icons/content/reply";
import { grey400 } from "material-ui/styles/colors";

//Validation rules:
const validate = values => {
  const errors = {};
  const requiredFields = ["name", "price", "is_avail", "description"];
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
}) => {
  return (
    <SelectField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );
};

const style = {
  margin: 12
};

class NewItem extends Component {
  state = {
    error: false,
    errorMessage: ""
  };

  onSubmit = async data => {
    const finalData = {
      menu_id: this.props.match.params.id,
      ...data
    };
    console.log(finalData);

    const token = localStorage.getItem("token");

    const url = `https://restaurantportal.herokuapp.com/api/v1/menu_items`;

    try {
      await axios({
        method: "post",
        url,
        data: finalData,
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      this.props.history.goBack();
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Card style={{ marginTop: "64px" }} className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <IconButton
            touch={true}
            tooltip="Go Back"
            tooltipPosition="bottom-left"
          >
            <Back
              color={grey400}
              onClick={() => {
                this.props.history.goBack();
              }}
            />
          </IconButton>
          <div>
            <Field name="name" component={renderTextField} label="Menu Name" />
          </div>
          <div>
            <Field name="price" component={renderTextField} label="Price" />
          </div>
          <div>
            <Field
              name="item_image"
              component={renderTextField}
              label="Item Image"
            />
          </div>
          <div>
            <Field
              name="is_avail"
              component={renderSelectField}
              label="Available now?"
            >
              <MenuItem value={true} primaryText="Yes" />
              <MenuItem value={false} primaryText="No" />
            </Field>
          </div>
          <div>
            <Field
              name="description"
              component={renderTextField}
              label="Description"
              multiLine={true}
              rows={2}
            />
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
          {this.state.error && (
            <Alert bsStyle="warning">
              <strong>Holy guacamole!</strong> {this.state.errorMessage}
            </Alert>
          )}
        </form>
      </Card>
    );
  }
}

export default reduxForm({
  form: "newItem", // a unique identifier for this form
  validate
})(NewItem);
