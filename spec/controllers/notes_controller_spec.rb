require 'rails_helper'

RSpec.describe NotesController, type: :controller do
  before(:all) do
    @user = create(:user)
  end

  after(:all) do
    @user.destroy!
  end

  describe "GET #index" do
    before do
      6.times { @user.notes.create(attributes_for(:note)) }
    end

    after do
      @user.notes.destroy_all
    end

    it "should render list of notes" do
      sign_in @user
      get :index, format: :json

      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(assigns(:notes).count).to be(5)
      expect(response).to render_template(:index)
    end

    it "should return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end

  describe "POST #create" do
    after do
      @user.notes.destroy_all
    end

    it "should create add note" do
      sign_in @user
      post :create, format: :json, note: attributes_for(:note)

      expect(response).to have_http_status(200)
      expect(response).to render_template(:show)
    end

    it "should return 401 error fot unauthenticated user" do
      post :create, format: :json, note: attributes_for(:note)

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for note with empty content" do
      sign_in @user
      post :create, format: :json, note: attributes_for(:note, date: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end

    it "should return 400 error for note with empty date" do
      sign_in @user
      post :create, format: :json, note: attributes_for(:note, note: '')

      expect(response).to have_http_status(400)
      expect(response).to render_template('base/error')
    end
  end
end
