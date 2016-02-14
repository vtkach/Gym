require 'rails_helper'

RSpec.describe ProfilesController, type: :controller do
  before do
    @user = create(:user, profile: build(:profile))
  end

  after do
    @user.destroy!
  end

  describe "GET #show" do
    it "should render profile template" do
      sign_in @user
      get :show, format: :json

      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      get :show, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "PUT #update" do
    it "should update profile" do
      sign_in @user

      expect(@user.profile.firstName).to eq('FirstName')

      put :update, format: :json, profile: attributes_for(:profile, firstName: 'first name')

      @user.reload

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
      expect(@user.profile.firstName).to eq('first name')
    end

    it "should return 400 erro for invalid parameters" do
      sign_in @user

      expect(@user.profile.age).to eq(15)

      put :update, format: :json, profile: attributes_for(:profile, age: 20)

      @user.reload

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 401 error fot unauthenticated user" do
      put :update, format: :json, profile: attributes_for(:profile, firstName: 'first name')

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end
end
