require 'rails_helper'

RSpec.describe ShoulderIndex, type: :model do
  before do
    @user = create(:user)
    @shoulder_index = ShoulderIndex.new(attributes_for(:shoulder_index, user: @user))
  end

  after do
    @user.destroy!
    @shoulder_index.destroy!
  end

  subject { @shoulder_index }

  it { should respond_to(:shoulder) }
  it { should respond_to(:shoulderWidth) }
  it { should respond_to(:brachialIndex) }
  it { should respond_to(:date) }
  it { should respond_to(:age) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @shoulder_index.save!

    expect(@shoulder_index).to be_valid
  end

  describe "#date" do
    it "can't be empty" do
      @shoulder_index.date = ''
      expect(@shoulder_index).not_to be_valid

      @shoulder_index.date = Time.now
      expect(@shoulder_index).to be_valid
    end
  end

  describe "#age" do
    it "can't be empty" do
      @shoulder_index.age = ''
      expect(@shoulder_index).not_to be_valid
    end

    it "should be in range 15-18" do
      @shoulder_index.age = 20
      expect(@shoulder_index).not_to be_valid

      @shoulder_index.age = 15
      expect(@shoulder_index).to be_valid

      @shoulder_index.age = 13
      expect(@shoulder_index).not_to be_valid
    end

    it "should be a number" do
      @shoulder_index.age = 'str'
      expect(@shoulder_index).not_to be_valid

      @shoulder_index.age = 15
      expect(@shoulder_index).to be_valid
    end
  end

  [
    {
      name: 'shoulder',
      min: 10,
      normal: 80,
      max: 100
    },
    {
      name: 'shoulderWidth',
      min: 10,
      normal: 75,
      max: 200
    }
  ].each do |attr|
    setter_symbol = (attr[:name] + '=').to_sym

    describe "##{attr[:name]}" do
      it "can't be empty" do
        @shoulder_index.send(setter_symbol, '')
        expect(@shoulder_index).not_to be_valid
      end

      it "should be a number" do
        @shoulder_index.send(setter_symbol, 'str')
        expect(@shoulder_index).not_to be_valid

        @shoulder_index.send(setter_symbol.to_sym, attr[:normal])
        expect(@shoulder_index).to be_valid
      end

      it "should be in range #{attr[:min]}-#{attr[:max]}" do
        @shoulder_index.send(setter_symbol, attr[:min] - 20)
        expect(@shoulder_index).not_to be_valid

        @shoulder_index.send(setter_symbol, attr[:normal])
        expect(@shoulder_index).to be_valid

        @shoulder_index.send(setter_symbol, attr[:max] + 20)
        expect(@shoulder_index).not_to be_valid
      end
    end
  end
end
