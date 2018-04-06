import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import IconButton from "material-ui/IconButton";
import Back from "material-ui/svg-icons/content/reply";
import { grey400 } from "material-ui/styles/colors";
import { updateItem } from "../actions/menu";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateItemAction: (data, itemId) => {
      dispatch(updateItem(data, itemId));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.menu.item
  };
};

//Validation rules:
const validate = values => {
  const errors = {};
  const requiredFields = ["name", "price", "description"];
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

const style = {
  margin: 12
};

class EditItem extends Component {
  componentDidMount = async () => {
    this.handleInitialize();
  };

  handleInitialize() {
    const { item } = this.props;

    const initData = {
      name: item.attributes.name,
      description: item.attributes.description,
      price: item.attributes.price,
      item_image: item.attributes["item-image"]
    };

    this.props.initialize(initData);
  }

  onSubmit = async data => {
    await this.props.updateItemAction(data, this.props.item.id);
    this.props.history.goBack();
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, isFetch } = this.props;

    if (isFetch) {
      return (
        <div
          style={{
            marginTop: "100px"
          }}
        >
          <CircularProgress size={60} thickness={7} />
        </div>
      );
    }

    return (
      <Card className="container" style={{ marginTop: "64px" }}>
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
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
              label="Image Link"
            />
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
        </form>
      </Card>
    );
  }
}

EditItem = connect(mapStateToProps, mapDispatchToProps)(EditItem);

export default reduxForm({
  form: "editItem", // a unique identifier for this form
  validate
})(EditItem);
