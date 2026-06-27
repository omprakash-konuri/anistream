class Api::V1::EpisodesController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show]
  before_action :authenticate_admin!, only: [:create]

  def index
    anime = Anime.find(params[:anime_id])
    episodes = anime.episodes.order(season_number: :asc, episode_number: :asc)
    render json: episodes
  end

  def show
    if params[:anime_id]
      anime = Anime.find(params[:anime_id])
      episode = anime.episodes.find(params[:id])
    else
      episode = Episode.find(params[:id])
    end
    render json: episode
  end

  def create
    anime = Anime.find(params[:anime_id])
    episode = anime.episodes.build(episode_params)
    if episode.save
      render json: episode, status: :created
    else
      render json: { errors: episode.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def episode_params
    params.permit(:season_number, :episode_number, :title, :description, :duration_seconds, :video_url, :thumbnail_url)
  end
end