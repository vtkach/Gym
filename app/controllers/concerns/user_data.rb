module UserData

  def valid_user?
    !current_user.nil?
  end

  def get_user_id
    current_user.id
  end

end