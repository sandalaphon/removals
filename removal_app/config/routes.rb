Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  get   '/api/users' => 'users#allusers'
  put   '/users/:id(.:format)' => 'users#update'
  delete '/users/:id(.:format)' => 'users#delete'

  post   '/api/trips/new' => 'trips#create'
  post   '/api/trips/today_closest.json' => 'trips#today_closest'
  post   '/api/trips/partload_closest_pickup' => 'trips#partload_closest_pickup'
  get    '/api/rosCandidates' => 'trips#rosCandidates'
  get    '/api/trips' => 'trips#index'

  get    '/api/surveys' => 'surveys#index'
  post    '/api/surveys/new' => 'surveys#create'

  get    '/api/branches' => 'branches#index'


  get    '/api/employees' => 'employees#index'


  get   '/api/get_trip_by_id/:trip_id' => 'removal_from_store#get_trip_by_id'
  
  

  get    '/api/survey_object' => 'survey_objects#index'
  post    '/api/survey_object/new' => 'survey_objects#create'

  get    'api/removal_from_store/:start_date/:end_date/:id' => 'removal_from_store#index'

  get    '/api/:company_id' => 'companies#index'

  get    '/api/costs/index'  => 'costs#index'
  put    '/api/costs/update' => 'costs#update'


  


  resources :users do
    collection {post :create_user, via: :options}
  end




  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

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
