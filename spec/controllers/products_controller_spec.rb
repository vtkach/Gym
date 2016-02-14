require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  before(:all) do
    @user = create(:user)

    %w(product1 product2 product3).each do |product|
      Product.create(name: product,
                     proteins: 10,
                     fats: 10,
                     carbohydrates: 10,
                     calories: 10)
    end
  end

  after(:all) do
    @user.destroy!
    Product.destroy_all
  end

  describe "GET #index" do
    it "should return a list of products" do
      sign_in @user
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(response).to render_template(:index)
      expect(assigns(:products).count).to be(3)
    end

    it "should return 401 error fot unauthenticated user" do
      get :index, format: :json

      expect(response).to have_http_status(401)
      expect(response).to render_template('base/error')
    end
  end
end
