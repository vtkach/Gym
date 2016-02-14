require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before do
    @user = create(:user)
  end

  after do
    @user.destroy!
  end

  let(:user_params) do
    {
      email: @user.email,
      password: '12345678',
      remember_me: 0
    }
  end

  describe "POST #create" do
    it "should return current user, if user is authorized" do
      sign_in @user

      post :create, format: :json, user: user_params

      expect(response).to be_success
      expect(response).to render_template('users/user_profile')
    end

    it "should create new session and return user data" do
      post :create, format: :json, user: user_params

      expect(response).to be_success
      expect(response).to render_template('users/user_profile')
    end
  end

  describe "DELETE #destroy" do
    it "should destroy user session" do
      sign_in @user
      request.env['devise.mapping'] = Devise.mappings[:user]

      delete :destroy, format: :json

      expect(response).to be_success
      expect(controller.current_user).to be_falsey
    end
  end

  describe "GET #get_current_user" do
    it "should return current user" do
      sign_in @user
      request.env['devise.mapping'] = Devise.mappings[:user]

      get :get_current_user, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template('users/user_profile')
    end

    it "should return 401 error for unauthenticated user" do
      request.env['devise.mapping'] = Devise.mappings[:user]

      get :get_current_user, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "GET #check_session" do
    it "should return status 200, if session is valid" do
      sign_in @user
      request.env['devise.mapping'] = Devise.mappings[:user]

      get :check_session, format: :json

      expect(response).to have_http_status(200)
    end

    it "should return 401 error for unauthenticated user" do
      request.env['devise.mapping'] = Devise.mappings[:user]

      get :check_session, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end
end
