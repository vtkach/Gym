require 'rails_helper'

RSpec.describe DefinitionsController, type: :controller do
  before(:all) do
    @user = create(:user)
  end

  after(:all) do
    @user.destroy!
  end

  describe "GET #index" do
    before do
      6.times { @user.definitions.create(attributes_for(:definition)) }
    end

    after do
      @user.definitions.destroy_all
    end

    it "should render 5 definitions" do
      sign_in @user
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template(:index)
      expect(assigns(:definitions).count).to be(5)
    end

    it "should return return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "POST #create" do
    after do
      @user.definitions.destroy_all
    end

    it "should create new definition" do
      sign_in @user
      post :create, format: :json, definition: attributes_for(:definition)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      post :create, format: :json, definition: attributes_for(:definition)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      post :create, format: :json, definition: attributes_for(:definition, proteins: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      post :create, format: :json, definition: attributes_for(:definition, proteins: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end

  describe "PUT #update" do
    before do
      @definition = @user.definitions.create(attributes_for(:definition))
    end

    after do
      @definition.destroy!
    end

    it "should update definition" do
      sign_in @user
      put :update, id: @definition, format: :json, definition: attributes_for(:definition)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      put :update, id: @definition, format: :json, definition: attributes_for(:definition)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for invalid attributes" do
      sign_in @user
      put :update, id: @definition, format: :json, definition: attributes_for(:definition, proteins: 'str')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for empty attributes" do
      sign_in @user
      put :update, id: @definition, format: :json, definition: attributes_for(:definition, proteins: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end
end
