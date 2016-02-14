require 'rails_helper'

RSpec.describe MotorActivitiesController, type: :controller do
  before(:all) do
    @user = create(:user)
  end

  after(:all) do
    @user.destroy!
  end

  describe "GET #index" do
    before do
      6.times { @user.motor_activities.create(attributes_for(:motor_activity)) }
    end

    after do
      @user.motor_activities.destroy_all
    end

    it "should render 5 motor activities" do
      sign_in @user
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template(:index)
      expect(assigns(:motor_activities).count).to be(5)
    end

    it "should return return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "POST #create" do
    after do
      @user.motor_activities.destroy_all
    end

    it "should create new motor activity" do
      sign_in @user
      post :create, format: :json, motorActivity: attributes_for(:motor_activity)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      post :create, format: :json, motor_activity: attributes_for(:motor_activity)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      post :create, format: :json, motorActivity: attributes_for(:motor_activity, smlresult: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      post :create, format: :json, motorActivity: attributes_for(:motor_activity, blresult: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end

  describe "PUT #update" do
    before do
      @motor_activity = @user.motor_activities.create(attributes_for(:motor_activity))
    end

    after do
      @motor_activity.destroy!
    end

    it "should update motor activity" do
      sign_in @user
      put :update, id: @motor_activity, format: :json, motorActivity: attributes_for(:motor_activity)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      put :update, id: @motor_activity, format: :json, motor_activity: attributes_for(:motor_activity)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      put :update, id: @motor_activity, format: :json, motorActivity: attributes_for(:motor_activity, smlresult: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      put :update, id: @motor_activity, format: :json, motorActivity: attributes_for(:motor_activity, blresult: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end
end
