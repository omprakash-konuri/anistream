class Api::V1::AnimesController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    animes = Anime.all
    render json: animes
  end

  def show
    anime = Anime.find(params[:id])
    render json: anime
  end

  def create
    anime = Anime.new(anime_params)
    if anime.save
      render json: anime, status: :created
    else
      render json: { errors: anime.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    anime = Anime.find(params[:id])
    if anime.update(anime_params)
      render json: anime
    else
      render json: { errors: anime.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    anime = Anime.find(params[:id])
    anime.destroy
    render json: { success: true }
  end

  private

  def anime_params
    params.permit(:title, :description, :status, :release_year, :thumbnail_url, :banner_url)
  end
end