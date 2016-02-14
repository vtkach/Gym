require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = build(:user)
  end

  subject { @user }

  it { should respond_to(:email) }

  describe "when email address is already taken" do
    before do
      @user.save!
    end

    after do
      @user.destroy!
    end

    it "shouldn't be valid" do
      new_user = build(:user)

      expect(new_user).not_to be_valid
    end
  end
end
