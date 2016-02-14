require 'rails_helper'

RSpec.describe Product, type: :model do
  subject { Product.new }

  it { should respond_to(:name) }
  it { should respond_to(:proteins) }
  it { should respond_to(:fats) }
  it { should respond_to(:carbohydrates) }
  it { should respond_to(:calories) }
end
