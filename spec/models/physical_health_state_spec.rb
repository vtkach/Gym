require 'rails_helper'

RSpec.describe PhysicalHealthState, type: :model do
  before do
    @user = create(:user)
    @physical_health_state = PhysicalHealthState.new(attributes_for(:physical_health_state, user: @user))
  end

  after do
    @user.destroy!
    @physical_health_state.destroy!
  end

  subject { @physical_health_state }

  it { should respond_to(:date) }
  it { should respond_to(:age) }
  it { should respond_to(:height) }
  it { should respond_to(:weight) }
  it { should respond_to(:pressure) }
  it { should respond_to(:volume) }
  it { should respond_to(:wrist) }
  it { should respond_to(:pulse) }
  it { should respond_to(:pulseRecovering) }
  it { should respond_to(:result) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @physical_health_state.save!

    expect(@physical_health_state).to be_valid
  end

  describe "#date" do
    it "can't be empty" do
      @physical_health_state.date = ''
      expect(@physical_health_state).not_to be_valid

      @physical_health_state.date = Time.now
      expect(@physical_health_state).to be_valid
    end
  end

  describe "#age" do
    it "can't be empty" do
      @physical_health_state.age = ''
      expect(@physical_health_state).not_to be_valid
    end

    it "should be in range 15-18" do
      @physical_health_state.age = 20
      expect(@physical_health_state).not_to be_valid

      @physical_health_state.age = 15
      expect(@physical_health_state).to be_valid

      @physical_health_state.age = 13
      expect(@physical_health_state).not_to be_valid
    end

    it "should be a number" do
      @physical_health_state.age = 'str'
      expect(@physical_health_state).not_to be_valid

      @physical_health_state.age = 15
      expect(@physical_health_state).to be_valid
    end
  end

  describe "#pulseRecovering" do
    it "can't be empty" do
      @physical_health_state.pulseRecovering = ''
      expect(@physical_health_state).not_to be_valid
    end

    it "should be more then 0" do
      @physical_health_state.pulseRecovering = -10
      expect(@physical_health_state).not_to be_valid

      @physical_health_state.pulseRecovering = 50
      expect(@physical_health_state).to be_valid
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
      name: 'pressure',
      min: 40,
      normal: 180,
      max: 240
    },
    {
      name: 'volume',
      min: 1000,
      normal: 4000,
      max: 7000
    },
    {
      name: 'wrist',
      min: 0,
      normal: 50,
      max: 100
    },
    {
      name: 'pulse',
      min: 40,
      normal: 50,
      max: 250
    }
  ].each do |attr|
    setter_symbol = (attr[:name] + '=').to_sym

    describe "##{attr[:name]}" do
      it "can't be empty" do
        @physical_health_state.send(setter_symbol, '')
        expect(@physical_health_state).not_to be_valid
      end

      it "should be a number" do
        @physical_health_state.send(setter_symbol, 'str')
        expect(@physical_health_state).not_to be_valid

        @physical_health_state.send(setter_symbol.to_sym, attr[:normal])
        expect(@physical_health_state).to be_valid
      end

      it "should be in range #{attr[:min]}-#{attr[:max]}" do
        @physical_health_state.send(setter_symbol, attr[:min] - 20)
        expect(@physical_health_state).not_to be_valid

        @physical_health_state.send(setter_symbol, attr[:normal])
        expect(@physical_health_state).to be_valid

        @physical_health_state.send(setter_symbol, attr[:max] + 20)
        expect(@physical_health_state).not_to be_valid
      end
    end
  end
end
