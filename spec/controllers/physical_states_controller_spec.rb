require 'rails_helper'

RSpec.describe PhysicalStatesController, type: :controller do
  before(:all) do
    @user = create(:user)
  end

  after(:all) do
    @user.destroy!
  end

  describe "GET #index" do
    before do
      6.times { @user.physical_states.create(attributes_for(:physical_state)) }
    end

    after do
      @user.physical_states.delete_all
    end

    it "should render 5 physical states" do
      sign_in @user
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template(:index)
      expect(assigns(:physical_states).count).to be(5)
    end

    it "should return return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "POST #create" do
    after do
      @user.physical_states.delete_all
    end

    it "should create new physical state" do
      sign_in @user
      post :create, format: :json, physicalState: attributes_for(:physical_state)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      post :create, format: :json, physicalState: attributes_for(:physical_state)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      post :create, format: :json, physicalState: attributes_for(:physical_state, height: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      post :create, format: :json, physicalState: attributes_for(:physical_state, height: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end

  describe "PUT #update" do
    before do
      @physical_states = @user.physical_states.create(attributes_for(:physical_state))
    end

    after do
      @physical_states.destroy!
    end

    it "should update physical state" do
      sign_in @user
      put :update,
          id: @physical_states,
          format: :json,
          physicalState: attributes_for(:physical_state)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      put :update,
          id: @physical_states,
          format: :json,
          physicalState: attributes_for(:physical_state)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      put :update,
          id: @physical_states,
          format: :json,
          physicalState: attributes_for(:physical_state, height: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      put :update,
          id: @physical_states,
          format: :json,
          physicalState: attributes_for(:physical_state, height: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end
end
