FactoryGirl.define do
  factory :note do
    date Time.now
    note 'Some content'
  end
end
