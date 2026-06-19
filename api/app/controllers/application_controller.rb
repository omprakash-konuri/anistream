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
end