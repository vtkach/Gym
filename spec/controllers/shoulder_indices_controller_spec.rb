require 'rails_helper'

RSpec.describe ShoulderIndicesController, type: :controller do
  before(:all) do
    @user = create(:user)
  end

  after(:all) do
    @user.destroy!
  end

  describe "GET #index" do
    before do
      6.times { @user.shoulder_indexes.create(attributes_for(:shoulder_index)) }
    end

    after do
      @user.shoulder_indexes.delete_all
    end

    it "should render 5 shoulder indexes" do
      sign_in @user
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template(:index)
      expect(assigns(:shoulder_indices).count).to be(5)
    end

    it "should return return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "POST #create" do
    after do
      @user.shoulder_indexes.delete_all
    end

    it "should create new shoulder index" do
      sign_in @user
      post :create, format: :json, shoulderIndex: attributes_for(:shoulder_index)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      post :create, format: :json, shoulderIndex: attributes_for(:shoulder_index)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      post :create, format: :json, shoulderIndex: attributes_for(:shoulder_index, shoulder: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      post :create, format: :json, shoulderIndex: attributes_for(:shoulder_index, shoulder: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end

  describe "PUT #update" do
    before do
      @shoulder_indexes = @user.shoulder_indexes.create(attributes_for(:shoulder_index))
    end

    after do
      @shoulder_indexes.destroy!
    end

    it "should update shoulder index" do
      sign_in @user
      put :update,
          id: @shoulder_indexes,
          format: :json,
          shoulderIndex: attributes_for(:shoulder_index)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      put :update,
          id: @shoulder_indexes,
          format: :json,
          shoulderIndex: attributes_for(:shoulder_index)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      put :update,
          id: @shoulder_indexes,
          format: :json,
          shoulderIndex: attributes_for(:shoulder_index, shoulder: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      put :update,
          id: @shoulder_indexes,
          format: :json,
          shoulderIndex: attributes_for(:shoulder_index, shoulder: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end
end
