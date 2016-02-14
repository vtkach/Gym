require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  let(:user_data) do
    {
      email: 'some@mail.com',
      password: '12345678',
      password_confirmation: '12345678'
    }
  end

  describe "POST #create" do
    it "should create new user" do
      expect(User.count).to be(0)

      @request.env['devise.mapping'] = Devise.mappings[:user]
      post :create, format: :json, user: user_data

      expect(response).to have_http_status(200)
      expect(response).to render_template('users/user_profile')
      expect(User.count).to be(1)

      User.destroy_all
    end

    it "should return 422 error, if user data invalid" do
      expect(User.count).to be(0)

      @request.env['devise.mapping'] = Devise.mappings[:user]
      post :create, format: :json, user: {}

      expect(response).to have_http_status(422)
      expect(response).to render_template('base/error')
      expect(User.count).to be(0)
    end

    it "should return current user, if user is authorized" do
      @user = create(:user)
      sign_in @user

      @request.env['devise.mapping'] = Devise.mappings[:user]
      expect(User.count).to be(1)
      post :create, format: :json, user: {}

      expect(response).to have_http_status(302)
      expect(response).to redirect_to('/users/current_user')
      expect(User.count).to be(1)

      @user.destroy!
    end
  end
end
