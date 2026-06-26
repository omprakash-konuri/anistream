class Api::V1::WatchlistController < ApplicationController
  before_action :authenticate_user!

  def index
    profile = @current_user.profiles.first
    watchlist = profile.watchlists.includes(:anime)
    render json: watchlist.map { |w| w.anime }
  end

  def create
    profile = @current_user.profiles.first
    watchlist = profile.watchlists.find_or_initialize_by(anime_id: params[:anime_id])

    if watchlist.new_record?
      watchlist.save
      render json: { added: true }, status: :created
    else
      render json: { added: false, message: "Already in watchlist" }, status: :ok
    end
  end

  def destroy
    profile = @current_user.profiles.first
    watchlist = profile.watchlists.find_by(anime_id: params[:id])

    if watchlist
      watchlist.destroy
      render json: { removed: true }
    else
      render json: { error: "Not found" }, status: :not_found
    end
  end
end