module UserData

  def generate_response user, profile
    user_data = {}

    user_data[:user] = user.to_json
    user_data[:profile] = profile.to_json

    user_data
  end

end