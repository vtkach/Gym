require 'rails_helper'

RSpec.describe Profile, type: :model do
  before do
    @user = create(:user, profile: build(:profile))
    @profile = @user.profile
  end

  after do
    @user.destroy!
  end

  subject { @profile }

  it { should respond_to(:age) }
  it { should respond_to(:lastName) }
  it { should respond_to(:firstName) }
  it { should respond_to(:surname) }
  it { should respond_to(:gender) }
  it { should respond_to(:school) }
  it { should respond_to(:group) }
  it { should respond_to(:household) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @profile.save!

    expect(@profile).to be_valid
  end

  describe "#age" do
    it "can't be empty" do
      @profile.age = ''
      expect(@profile).not_to be_valid
    end

    it "should be in range 15-18" do
      @profile.age = 20
      expect(@profile).not_to be_valid

      @profile.age = 15
      expect(@profile).to be_valid

      @profile.age = 13
      expect(@profile).not_to be_valid
    end

    it "should be a number" do
      @profile.age = 'str'
      expect(@profile).not_to be_valid

      @profile.age = 15
      expect(@profile).to be_valid
    end
  end
end
