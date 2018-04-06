import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append("name", this.state.email);
    // formData.append("password", this.state.password);

    let data = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    };

    const url = "https://restaurantportal.herokuapp.com/api/v1/user_token";

    axios({
      method: "post",
      url,
      data: data
    })
      .then(res => {
        if (res.data.jwt !== null) {
          localStorage.setItem("token", res.data.jwt);
        }
      })
      .catch(error => {
        if (error) {
          alert("Please check your email or password");
        }
      });

    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginTop: "70px" }}>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
