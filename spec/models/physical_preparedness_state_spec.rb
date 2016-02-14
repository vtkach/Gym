require 'rails_helper'

RSpec.describe PhysicalPreparednessState, type: :model do
  before do
    @user = create(:user)
    @physical_preparedness_state = PhysicalPreparednessState.new(attributes_for(:physical_preparedness_state, user: @user))
  end

  after do
    @user.destroy!
    @physical_preparedness_state.destroy!
  end

  subject { @physical_preparedness_state }

  it { should respond_to(:date) }
  it { should respond_to(:age) }
  it { should respond_to(:pushUps) }
  it { should respond_to(:raising) }
  it { should respond_to(:jumpLength) }
  it { should respond_to(:jumpHeight) }
  it { should respond_to(:estafeta) }
  it { should respond_to(:cooperTest) }
  it { should respond_to(:inclineBody) }
  it { should respond_to(:flamingoTest) }
  it { should respond_to(:inclines) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @physical_preparedness_state.save!

    expect(@physical_preparedness_state).to be_valid
  end

  describe "#date" do
    it "can't be empty" do
      @physical_preparedness_state.date = ''
      expect(@physical_preparedness_state).not_to be_valid

      @physical_preparedness_state.date = Time.now
      expect(@physical_preparedness_state).to be_valid
    end
  end

  describe "#age" do
    it "can't be empty" do
      @physical_preparedness_state.age = ''
      expect(@physical_preparedness_state).not_to be_valid
    end

    it "should be in range 15-18" do
      @physical_preparedness_state.age = 20
      expect(@physical_preparedness_state).not_to be_valid

      @physical_preparedness_state.age = 15
      expect(@physical_preparedness_state).to be_valid

      @physical_preparedness_state.age = 13
      expect(@physical_preparedness_state).not_to be_valid
    end

    it "should be a number" do
      @physical_preparedness_state.age = 'str'
      expect(@physical_preparedness_state).not_to be_valid

      @physical_preparedness_state.age = 15
      expect(@physical_preparedness_state).to be_valid
    end
  end

  [
    {
      name: 'pushUps',
      min: 0,
      normal: 180,
      max: 500
    },
    {
      name: 'raising',
      min: 0,
      normal: 75,
      max: 500
    },
    {
      name: 'jumpLength',
      min: 0,
      normal: 180,
      max: 500
    },
    {
      name: 'jumpHeight',
      min: 0,
      normal: 200,
      max: 500
    },
    {
      name: 'estafeta',
      min: 10,
      normal: 11,
      max: 12
    },
    {
      name: 'cooperTest',
      min: 2000,
      normal: 3000,
      max: 4000
    },
    {
      name: 'inclineBody',
      min: 0,
      normal: 50,
      max: 100
    },
    {
      name: 'flamingoTest',
      min: 3,
      normal: 12,
      max: 19
    },
    {
      name: 'inclines',
      min: 0,
      normal: 12,
      max: 100
    }
  ].each do |attr|
    setter_symbol = (attr[:name] + '=').to_sym

    describe "##{attr[:name]}" do
      it "can't be empty" do
        @physical_preparedness_state.send(setter_symbol, '')
        expect(@physical_preparedness_state).not_to be_valid
      end

      it "should be a number" do
        @physical_preparedness_state.send(setter_symbol, 'str')
        expect(@physical_preparedness_state).not_to be_valid

        @physical_preparedness_state.send(setter_symbol.to_sym, attr[:normal])
        expect(@physical_preparedness_state).to be_valid
      end

      it "should be in range #{attr[:min]}-#{attr[:max]}" do
        @physical_preparedness_state.send(setter_symbol, attr[:min] - 20)
        expect(@physical_preparedness_state).not_to be_valid

        @physical_preparedness_state.send(setter_symbol, attr[:normal])
        expect(@physical_preparedness_state).to be_valid

        @physical_preparedness_state.send(setter_symbol, attr[:max] + 20)
        expect(@physical_preparedness_state).not_to be_valid
      end
    end
  end
end
