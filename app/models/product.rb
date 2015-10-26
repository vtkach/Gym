class Product < ActiveRecord::Base
end

# == Schema Information
#
# Table name: products
#
#  id            :integer          not null, primary key
#  name          :string
#  proteins      :integer
#  fats          :integer
#  carbohydrates :integer
#  calories      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
