require 'rails_helper'

RSpec.describe PhysicalState, type: :model do
  before do
    @user = create(:user)
    @physical_state = PhysicalState.new(attributes_for(:physical_state, user: @user))
  end

  after do
    @user.destroy!
    @physical_state.destroy!
  end

  subject { @physical_state }

  it { should respond_to(:date) }
  it { should respond_to(:age) }
  it { should respond_to(:height) }
  it { should respond_to(:weight) }
  it { should respond_to(:volume) }
  it { should respond_to(:circumference) }
  it { should respond_to(:bodyindex) }
  it { should respond_to(:lifeindex) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @physical_state.save!

    expect(@physical_state).to be_valid
  end

  describe "#date" do
    it "can't be empty" do
      @physical_state.date = ''
      expect(@physical_state).not_to be_valid

      @physical_state.date = Time.now
      expect(@physical_state).to be_valid
    end
  end

  describe "#age" do
    it "can't be empty" do
      @physical_state.age = ''
      expect(@physical_state).not_to be_valid
    end

    it "should be in range 15-18" do
      @physical_state.age = 20
      expect(@physical_state).not_to be_valid

      @physical_state.age = 15
      expect(@physical_state).to be_valid

      @physical_state.age = 13
      expect(@physical_state).not_to be_valid
    end

    it "should be a number" do
      @physical_state.age = 'str'
      expect(@physical_state).not_to be_valid

      @physical_state.age = 15
      expect(@physical_state).to be_valid
    end
  end

  [
    {
      name: 'height',
      min: 20,
      normal: 180,
      max: 250
    },
    {
      name: 'weight',
      min: 20,
      normal: 75,
      max: 150
    },
    {
      name: 'circumference',
      min: 20,
      normal: 80,
      max: 160
    }
  ].each do |attr|
    setter_symbol = (attr[:name] + '=').to_sym

    describe "##{attr[:name]}" do
      it "can't be empty" do
        @physical_state.send(setter_symbol, '')
        expect(@physical_state).not_to be_valid
      end

      it "should be a number" do
        @physical_state.send(setter_symbol, 'str')
        expect(@physical_state).not_to be_valid

        @physical_state.send(setter_symbol.to_sym, attr[:normal])
        expect(@physical_state).to be_valid
      end

      it "should be in range #{attr[:min]}-#{attr[:max]}" do
        @physical_state.send(setter_symbol, attr[:min] - 20)
        expect(@physical_state).not_to be_valid

        @physical_state.send(setter_symbol, attr[:normal])
        expect(@physical_state).to be_valid

        @physical_state.send(setter_symbol, attr[:max] + 20)
        expect(@physical_state).not_to be_valid
      end
    end
  end
end
