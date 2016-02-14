require 'rails_helper'

RSpec.describe Note, type: :model do
  before do
    @user = create(:user)
    @note = Note.new(attributes_for(:note, user: @user))
  end

  after do
    @user.destroy!
    @note.destroy!
  end

  subject { @note }

  it { should respond_to(:date) }
  it { should respond_to(:note) }
  it { should respond_to(:user_id) }

  it "should save with valid attributes" do
    @note.save!

    expect(@note).to be_valid
  end

  describe "#date" do
    it "can't be empty" do
      @note.date = ''
      expect(@note).not_to be_valid

      @note.date = Time.now
      expect(@note).to be_valid
    end
  end

  describe "#note" do
    it "can't be empty" do
      @note.note = ''
      expect(@note).not_to be_valid

      @note.note = 'str'
      expect(@note).to be_valid
    end
  end
end
