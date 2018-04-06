Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'
      resources :users
      resources :restaurants
      get 'users/:id/restaurants' => 'users#restaurants'
      get 'restaurants/:id/menus' => 'restaurants#menus'
      resources :menus
      resources :menu_items
    end
  end
end
