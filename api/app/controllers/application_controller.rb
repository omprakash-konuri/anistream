class ApplicationController < ActionController::API
  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    decoded = JwtService.decode(token)
    if decoded
      @current_user = User.find(decoded[:user_id])
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def authenticate_admin!
    authenticate_user!
    unless @current_user&.role == 'admin'
      render json: { error: "Forbidden" }, status: :forbidden
    end
  end
end