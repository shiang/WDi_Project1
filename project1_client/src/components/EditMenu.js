import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import { updateMenu } from "../actions/menu";
import IconButton from "material-ui/IconButton";
import Back from "material-ui/svg-icons/content/reply";
import { grey400 } from "material-ui/styles/colors";

const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.menu.menu,
    isFetch: state.menu.isFetch
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateMenuAction: (data, menuId) => {
      dispatch(updateMenu(data, menuId));
    }
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

class EditMenu extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount = async () => {
    this.handleInitialize();
  };

  handleInitialize() {
    const { menu } = this.props;

    const initData = {
      name: menu.attributes.name,
      description: menu.attributes.description,
      price: menu.attributes.price,
      imageLink: menu.attributes["menu-image"]
    };

    this.props.initialize(initData);
  }

  //context is like props which you can use to access info that are being passed down by the parent component. But do not abuse it and is suggested to use it only with React router.
  //We need to nagivate users to different URL by using React router and React router is available throughout all components in our app and can be accessed by using the "context" property

  onSubmit = async data => {
    await this.props.updateMenuAction(data, this.props.menu.id);
    this.props.history.goBack();
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, isFetch } = this.props;
    //console.log(handleSubmit);
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
              name="imageLink"
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

EditMenu = connect(mapStateToProps, mapDispatchToProps)(EditMenu);

export default reduxForm({
  form: "editMenu", // a unique identifier for this form
  validate
})(EditMenu);
