require 'rails_helper'

RSpec.describe StatisticController, type: :controller do
  before do
    @user = create(:user, profile: build(:profile))
  end

  after do
    @user.destroy!
  end

  describe "GET #index" do
    it "should return list of profiles" do
      sign_in @user
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template(:index)
      expect(assigns(:users_profiles)).not_to be_empty
    end

    it "should return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end
end
