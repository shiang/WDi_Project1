import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import RestaurantEditForm from "./components/RestaurantEditForm";
import RestaurantCard from "./components/RestaurantCard";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { createLogger } from "redux-logger";
import Form from "./components/Form";
import CreateRestaurant from "./components/CreateRestaurant";
import TopBar from "./components/TopBar";
import sideBarReducer from "./reducers/reducer-sidebar";
import menuReducer from "./reducers/reducer-menu";
import userReducer from "./reducers/reducer-user";
import NewMenu from "./components/NewMenu";
import Menu from "./components/Menu";
import EditMenu from "./components/EditMenu";
import Item from "./components/Item";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";
import Restaurant from "./components/Restaurant";
import DefaultLayout from "./components/DefaultLayout";
import LogIn from "./components/LoginPage";
import MyRestaurantCard from "./components/MyRestaurantCard";

const reducers = combineReducers({
  form: formReducer,
  sidebar: sideBarReducer,
  menu: menuReducer,
  user: userReducer,
});

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(createLogger(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const Root = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Router>
          <React.Fragment>
            <DefaultLayout path="/restaurants" component={TopBar} />
            <DefaultLayout path="/users" component={TopBar} />
            <Switch>
              <Route exact path="/" component={App} />
              <Route
                exact
                path="/restaurants"
                render={props => <RestaurantCard {...props} />}
              />
              <Route
                exact
                path="/restaurants/new"
                component={CreateRestaurant}
              />
              <Route exact path="/restaurants/:id" component={Restaurant} />
              <Route
                exact
                path="/restaurants/:id/edit"
                component={RestaurantEditForm}
              />
              <Route
                exact
                path="/restaurants/:id/menus/:id/menu_items/new"
                component={NewItem}
              />
              <Route
                exact
                path="/restaurants/:id/menus/:id/menu_items/:id"
                component={Item}
              />
              <Route
                exact
                path="/restaurants/:id/menus/:id/menu_items/:id/edit"
                component={EditItem}
              />
              <Route
                exact
                path="/restaurants/:id/menus/new"
                component={NewMenu}
              />
              <Route
                exact
                path="/restaurants/:id/menus/:id/edit"
                component={EditMenu}
              />
              <Route path="/restaurants/:id/menus/:id" component={Menu} />
              <Route exact path="/users/:id/restaurants" component={MyRestaurantCard} />
              <Route path="/user_token" component={Form} />
              <Route path="/login" component={LogIn} />
              <Route path="/signup" component={LogIn} />
              <Route path="*" component={App} />
            </Switch>
          </React.Fragment>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
