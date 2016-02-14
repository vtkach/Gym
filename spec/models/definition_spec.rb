require 'rails_helper'

RSpec.describe Definition, type: :model do
  before do
    @user = create(:user)
    @definition = Definition.new(attributes_for(:definition, user_id: @user.id))
  end

  after do
    @user.destroy!
    @definition.destroy!
  end

  subject { @definition }

  it { should respond_to(:age) }
  it { should respond_to(:date) }
  it { should respond_to(:proteins) }
  it { should respond_to(:fats) }
  it { should respond_to(:calories) }
  it { should respond_to(:carbohydrates) }
  it { should respond_to(:user_id) }

  it "should save model with valid attributes" do
    @definition.save!

    expect(@definition).to be_valid
  end

  describe "#age" do
    it "can't be empty" do
      @definition.age = ''
      expect(@definition).not_to be_valid
    end

    it "should be in range 15-18" do
      @definition.age = 20
      expect(@definition).not_to be_valid

      @definition.age = 15
      expect(@definition).to be_valid

      @definition.age = 13
      expect(@definition).not_to be_valid
    end

    it "should be a number" do
      @definition.age = 'str'
      expect(@definition).not_to be_valid

      @definition.age = 15
      expect(@definition).to be_valid
    end
  end

  describe "#date" do
    it "can't be empty" do
      @definition.date = ''
      expect(@definition).not_to be_valid

      @definition.date = Time.now
      expect(@definition).to be_valid
    end
  end

  describe "#proteins" do
    it "can't be empty" do
      @definition.proteins = ''
      expect(@definition).not_to be_valid
    end

    it "should be a number" do
      @definition.proteins = 'str'
      expect(@definition).not_to be_valid

      @definition.proteins = 12
      expect(@definition).to be_valid
    end
  end

  describe "#fats" do
    it "can't be empty" do
      @definition.fats = ''
      expect(@definition).not_to be_valid
    end

    it "should be a number" do
      @definition.fats = 'str'
      expect(@definition).not_to be_valid

      @definition.fats = 12
      expect(@definition).to be_valid
    end
  end

  describe "#calories" do
    it "can't be empty" do
      @definition.calories = ''
      expect(@definition).not_to be_valid
    end

    it "should be a number" do
      @definition.calories = 'str'
      expect(@definition).not_to be_valid

      @definition.calories = 12
      expect(@definition).to be_valid
    end
  end

  describe "#carbohydrates" do
    it "can't be empty" do
      @definition.carbohydrates = ''
      expect(@definition).not_to be_valid
    end

    it "should be a number" do
      @definition.carbohydrates = 'str'
      expect(@definition).not_to be_valid

      @definition.carbohydrates = 12
      expect(@definition).to be_valid
    end
  end
end
