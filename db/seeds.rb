# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.all.each do |user|
  unless user.profile
    user.profile = Profile.new(gender: 'male', age: 15)
    user.save
  end

  unless user.profile.age
    user.profile.update(age: 15)
  end

end

if Product.count == 0
  products_file = File.read('db/products.json')
  products = ActiveSupport::JSON.decode products_file
  Product.create(products)
end
