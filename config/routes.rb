Rails.application.routes.draw do
  
  devise_for :users, :controllers => { sessions: 'sessions', registrations: 'registrations' }

  devise_scope :user do
    get 'users/check_session' => 'sessions#check_session'
    get 'users/current_user' => 'sessions#get_current_user'
  end

  resources :notes, only: [:index, :create]
  resources :physical_states, only: [:index, :create, :update]
  resources :physical_health_states, only: [:index, :create, :update]
  resources :shoulder_indices, only: [:index, :create, :update]
  resources :physical_preparedness_states, only: [:index, :create, :update]
  resources :motor_activities, only: [:index, :create, :update]
  resources :main, only: [:index, :show]
  resources :products, only: [:index]
  resources :definitions, only: [:index, :create, :update]
  resources :statistic, only: [:index]
  resource :profile, only: [:show, :update]

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  root 'main#index'
  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
