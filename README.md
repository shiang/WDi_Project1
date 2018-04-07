## GA WDi26 Project 1
This is the second project for the GA WDi course. This project is split into two parts, the client side of the app and the server side of the app. This repository is the client side app which was built in React that works with the server side of the app that was built in Rails.

This project is a standard CRUD app that that manages restaurant and its menu information such as menu images, and pricing...etc.
---

## Client (Client)

### Installation
To run this app, run the following command after the git clone (or after downloading the repo)

```
npm install
```
---

### To run the app
After installing the dependencies of the app, simply run the following command to start the app:

```
npm start
```
It should automatically open the app in the browser which default to run on http://localhost:3000


### Note
Because this app only works with the backend built specifically for it. It is suggested to first go to the sign up page and sign up an account and log in in order to use all the features available.

FYI: the server is at https://restaurantportal.herokuapp.com/api/v1/restaurants

It is consisted of 5 models:
- Role
- User
- Restaurant
- Menu
- MenuItem

If you would like to build your own app that works with the backend mentioned above, simply make a HTTP POST request to below link with info below in the HTTP header

`https://restaurantportal.herokuapp.com/api/v1/user_token`

```
auth: {
  email: [THE EMAIL YOU USED FROM SIGN UP],
  password: [PASSWORD USED FOR YOUR SIGN UP]
}
```

This should return you a jwt token from the HTTP response which you can use in your app in order to use the API.
---
Restaurant Management Portal
Client app: https://restaurantportalclient.herokuapp.com/restaurants

Server API endpoints:
(Restaurants)
https://restaurantportal.herokuapp.com/api/v1/restaurants
(Menus)
https://restaurantportal.herokuapp.com/api/v1/menus
(MenuItems)
https://restaurantportal.herokuapp.com/api/v1/menu_items
---

### Specially thanks to below awesome open source software that helped me build this apps
- React router
- Redux
- Redux Form
- Material-ui
- React Bootstrap
- Styled-components
- redux-thunk
- axios

### Imaginary roadmap (again!!)
- [ ] Rating system
- [ ] My favorites
- [ ] Restaurant/Menu/MenuItem categories
- [ ] Search function for Restaurants/Menus (by address, categories, name...etc)
- [ ] Image uploads and multiple images per restaurant/menu/menu-item
- [ ] Better error handling
- [ ] Persisted app state
- [ ] Order function with payment integrated
- [ ] Social login
- [ ] Live chat support
---

## Server (Rails)
### Special thanks to below gems that I used for this project
- Active Model Serializer (for serialzing data into JSON format)
- Knock (For token based authentication and token generation)
- Faker (Generating bunch of seed data in a short time)

---

### Possible future roadmap
Please refer to the [client app repository](#client)

### License
---
MIT
