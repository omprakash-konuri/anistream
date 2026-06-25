class Api::V1::WatchHistoryController < ApplicationController
  before_action :authenticate_user!

  def create
    profile = current_user_profile
    return render json: { error: "No profile found" }, status: :not_found unless profile

    episode = Episode.find(params[:episode_id])

    history = WatchHistory.find_or_initialize_by(
      profile_id: profile.id,
      episode_id: episode.id
    )

    history.progress_seconds = params[:progress_seconds]
    history.watched_at = Time.current

    if history.save
      render json: { success: true, progress_seconds: history.progress_seconds }, status: :ok
    else
      render json: { errors: history.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def current_user_profile
    @current_user.profiles.first
  end
end