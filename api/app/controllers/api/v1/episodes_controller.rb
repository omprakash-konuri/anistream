class Api::V1::EpisodesController < ApplicationController
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
end