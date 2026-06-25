class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_user!

  def index
    profiles = @current_user.profiles
    render json: profiles
  end

  def create
    profile = @current_user.profiles.build(profile_params)
    if profile.save
      render json: profile, status: :created
    else
      render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    profile = @current_user.profiles.find(params[:id])
    profile.destroy
    render json: { success: true }
  end

  private

  def profile_params
    params.permit(:name, :avatar_url, :age_restricted, :language)
  end
end