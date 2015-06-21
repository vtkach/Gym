module TabValidationHelper

  def settings_for_numericality min, max
    {
        greater_than_or_equal_to: min,
        less_than_or_equal_to: max
    }
  end

  def age_date_validation
    age_validation
    # validates :date, numericality: { only_integet: true, greater_than: 0 }
  end

  def age_validation
    validates :age, numericality: settings_for_numericality(15, 18)
  end

end