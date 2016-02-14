require 'rails_helper'

RSpec.describe MotorActivity, type: :model do
  before do
    @user = create(:user)
    @motor_activity = MotorActivity.new(attributes_for(:motor_activity, user: @user))
  end

  after do
    @user.destroy!
    @motor_activity.destroy!
  end

  subject { @motor_activity }

  it { should respond_to(:date) }
  it { should respond_to(:age) }
  it { should respond_to(:smlresult) }
  it { should respond_to(:blresult) }
  it { should respond_to(:slresult) }
  it { should respond_to(:mlresult) }
  it { should respond_to(:hlresult) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @motor_activity.save!

    expect(@motor_activity).to be_valid
  end

  describe "#date" do
    it "can't be empty" do
      @motor_activity.date = ''
      expect(@motor_activity).not_to be_valid

      @motor_activity.date = Time.now
      expect(@motor_activity).to be_valid
    end
  end

  describe "#age" do
    it "can't be empty" do
      @motor_activity.age = ''
      expect(@motor_activity).not_to be_valid
    end

    it "should be in range 15-18" do
      @motor_activity.age = 20
      expect(@motor_activity).not_to be_valid

      @motor_activity.age = 15
      expect(@motor_activity).to be_valid

      @motor_activity.age = 13
      expect(@motor_activity).not_to be_valid
    end

    it "should be a number" do
      @motor_activity.age = 'str'
      expect(@motor_activity).not_to be_valid

      @motor_activity.age = 15
      expect(@motor_activity).to be_valid
    end
  end

  %w(smlresult blresult slresult mlresult hlresult).each do |attr|
    describe "##{attr}" do
      it "can't be empty" do
        @motor_activity.send((attr + '=').to_sym, '')
        expect(@motor_activity).not_to be_valid
      end

      it "should be a number" do
        @motor_activity.send((attr + '=').to_sym, 'str')
        expect(@motor_activity).not_to be_valid

        @motor_activity.send((attr + '=').to_sym, 12)
        expect(@motor_activity).to be_valid
      end
    end
  end
end
