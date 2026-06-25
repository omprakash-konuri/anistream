class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!, only: [:current_user]

  def register
    user = User.new(user_params)
    if user.save
      user.profiles.create!(name: user.username, language: 'en')
      token = JwtService.encode(user_id: user.id)
      render json: { token: token, user: user_response(user) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def login
    user = User.find_by(email: params[:email].downcase)
    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)
      render json: { token: token, user: user_response(user) }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def current_user
    render json: { user: user_response(@current_user) }
  end
  
  private

  def user_params
    params.permit(:email, :username, :password, :password_confirmation)
  end

  def user_response(user)
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar_url: user.avatar_url
    }
  end
end
