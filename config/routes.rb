Rails.application.routes.draw do
  get '/login', to: 'sessions#new'
  match '/login', to: 'sessions#create', via: [:post, :patch, :put]
  delete '/logout', to: 'sessions#destroy'

  namespace :admin do
    resources :users
  end
  root to: 'events#index'
  resources :events
end
